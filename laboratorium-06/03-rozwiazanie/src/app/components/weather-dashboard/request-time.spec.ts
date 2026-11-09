import { TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { describe, expect, it } from 'vitest';
import { WeatherDashboard } from './weather-dashboard';
import { CITIES } from '../../models/city';

describe('Time of request per city', () => {
  it('sets a timestamp at request start and preserves it after an error', () => {
    TestBed.configureTestingModule({imports: [WeatherDashboard],
      providers: [provideHttpClient(), provideHttpClientTesting()]});
    const http=TestBed.inject(HttpTestingController);
    const before=Date.now();
    const f=TestBed.createComponent(WeatherDashboard); f.detectChanges();
    expect(f.componentInstance.cards().length).toBe(3);
    for (const card of f.componentInstance.cards()) {
      expect(Date.parse(card.lastRequestedAt!)).toBeGreaterThanOrEqual(before);
    }
    const first=f.componentInstance.cards()[0].lastRequestedAt;
    http.expectOne(r => r.params.get('latitude') === String(CITIES[0].latitude))
      .flush('error', {status: 503, statusText: 'Unavailable'});
    expect(f.componentInstance.cards()[0].lastRequestedAt).toBe(first);
    const other=f.componentInstance.cards()[1];
    f.componentInstance.refreshCity(CITIES[0].id);
    expect(f.componentInstance.cards()[1]).toBe(other);
    f.destroy();
    http.verify({ignoreCancelled: true});
  });
});
