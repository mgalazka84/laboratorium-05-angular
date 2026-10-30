import { TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { WeatherApi } from './weather-api';
import { afterEach, beforeEach, describe, expect, it } from 'vitest';

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
  it('sends coordinates and maps the API response to our model', () => {
    let result: unknown;
    api.getWeather(52.4064, 16.9252).subscribe(data => result = data);
    const req = http.expectOne(r => r.url.includes('api.open-meteo.com'));
    expect(req.request.method).toBe('GET');
    expect(req.request.params.get('latitude')).toBe('52.4064');
    expect(req.request.params.get('longitude')).toBe('16.9252');
    expect(req.request.params.get('current')).toBe(
      'temperature_2m,apparent_temperature,relative_humidity_2m,pressure_msl');
    req.flush({current: {temperature_2m: 9.5, apparent_temperature: 8,
      relative_humidity_2m: 85, pressure_msl: 1030.7, time: '2026-10-30T10:00'}});
    expect(result).toEqual({temperature: 9.5, apparentTemperature: 8,
      humidity: 85, pressure: 1030.7, observedAt: '2026-10-30T10:00'});
  });
  it('passes server errors to the subscriber', () => {
    let status: number | undefined;
    api.getWeather(1, 2).subscribe({error: err => status = err.status});
    http.expectOne(r => r.url.includes('api.open-meteo.com'))
      .flush('unavailable', {status: 503, statusText: 'Unavailable'});
    expect(status).toBe(503);
  });
});
