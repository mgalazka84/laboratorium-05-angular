import { TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { afterEach, beforeEach, describe, expect, it } from 'vitest';
import { CITIES } from '../models/city';
import { WeatherApi } from './weather-api';

describe('WeatherApi', () => {
  let http: HttpTestingController;
  let api: WeatherApi;
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideHttpClient(), provideHttpClientTesting()],
    });
    api = TestBed.inject(WeatherApi);
    http = TestBed.inject(HttpTestingController);
  });
  afterEach(() => http.verify());
  it('sends the selected coordinates and maps the JSON contract', () => {
    let value: unknown;
    api.getWeather(CITIES[1]).subscribe(data => value = data);
    const req = http.expectOne(r => r.url.includes('api.open-meteo.com'));
    expect(req.request.method).toBe('GET');
    expect(req.request.params.get('latitude')).toBe('53.4285');
    expect(req.request.params.get('longitude')).toBe('14.5528');
    req.flush({current: {temperature_2m: 12, apparent_temperature: 11,
      relative_humidity_2m: 72, pressure_msl: 1017, time: '2026-11-09T10:00'}});
    expect(value).toEqual({temperature: 12, apparentTemperature: 11,
      humidity: 72, pressure: 1017, observedAt: '2026-11-09T10:00'});
  });
  it('passes an API error to the consumer', () => {
    let status: number | undefined;
    api.getWeather(CITIES[0]).subscribe({error: err => status = err.status});
    http.expectOne(r => r.url.includes('api.open-meteo.com'))
      .flush('offline', {status: 503, statusText: 'Unavailable'});
    expect(status).toBe(503);
  });
});
