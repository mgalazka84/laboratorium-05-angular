import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { afterEach, beforeEach, describe, expect, it } from 'vitest';
import { CITIES } from '../../models/city';
import { WeatherDashboard } from './weather-dashboard';

describe('WeatherDashboard with real child components and HTTP service', () => {
  let http: HttpTestingController;
  let f: ComponentFixture<WeatherDashboard>;
  const response = (temp: number) => ({current: {
    temperature_2m: temp, apparent_temperature: temp-1,
    relative_humidity_2m: 72, pressure_msl: 1017, time: '2026-11-09T10:00',
  }});
  const cityReq = (index: number) => http.expectOne(r =>
    r.params.get('latitude') === String(CITIES[index].latitude));
  const initialise = () => {
    f = TestBed.createComponent(WeatherDashboard);
    f.detectChanges();
    CITIES.forEach((_, i) => cityReq(i).flush(response(10+i)));
    f.detectChanges();
  };
  beforeEach(() => {
    TestBed.configureTestingModule({imports: [WeatherDashboard],
      providers: [provideHttpClient(), provideHttpClientTesting()]});
    http = TestBed.inject(HttpTestingController);
  });
  afterEach(() => http.verify({ignoreCancelled: true}));
  it('loads one card per city on startup', () => {
    initialise();
    expect(f.nativeElement.querySelectorAll('article').length).toBe(CITIES.length);
    expect(f.componentInstance.cards().every(c => c.weather && !c.loading)).toBe(true);
  });
  it('refreshes only the city identified by the child output', () => {
    initialise();
    const unchanged = f.componentInstance.cards()[1];
    f.nativeElement.querySelectorAll('article button')[0].click();
    f.detectChanges();
    expect(f.componentInstance.cards()[0].loading).toBe(true);
    expect(f.componentInstance.cards()[1]).toBe(unchanged);
    const request = cityReq(0);
    http.expectNone(r => r.params.get('latitude') === String(CITIES[1].latitude));
    request.flush(response(22)); f.detectChanges();
    expect(f.nativeElement.querySelectorAll('article')[0].textContent).toContain('22 °C');
    expect(f.componentInstance.cards()[1]).toBe(unchanged);
  });
  it('blocks duplicate requests for one city while allowing another city', () => {
    initialise();
    f.componentInstance.refreshCity(CITIES[0].id);
    f.componentInstance.refreshCity(CITIES[0].id);
    f.componentInstance.refreshCity(CITIES[1].id);
    cityReq(0).flush(response(20));
    cityReq(1).flush(response(21));
  });
  it('isolates an error and allows the same city to retry', () => {
    initialise();
    const other = f.componentInstance.cards()[1];
    f.componentInstance.refreshCity(CITIES[0].id);
    cityReq(0).flush('offline', {status: 503, statusText: 'Unavailable'});
    f.detectChanges();
    expect(f.componentInstance.cards()[0].loading).toBe(false);
    expect(f.nativeElement.querySelectorAll('[role=alert]').length).toBe(1);
    expect(f.componentInstance.cards()[1]).toBe(other);
    f.componentInstance.refreshCity(CITIES[0].id);
    expect(f.componentInstance.cards()[0].error).toBeNull();
    cityReq(0).flush(response(23)); f.detectChanges();
    expect(f.nativeElement.querySelector('[role=alert]')).toBeNull();
  });
  it('ignores an unknown identifier', () => {
    initialise();
    const old = f.componentInstance.cards();
    f.componentInstance.refreshCity('unknown');
    expect(f.componentInstance.cards()).toBe(old);
    http.expectNone(r => r.url.includes('api.open-meteo.com'));
  });
  it('cancels pending requests when the container is destroyed', () => {
    f = TestBed.createComponent(WeatherDashboard); f.detectChanges();
    const requests = http.match(r => r.url.includes('api.open-meteo.com'));
    f.destroy();
    expect(requests.every(r => r.cancelled)).toBe(true);
  });
});
