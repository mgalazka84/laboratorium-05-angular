import { TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { provideRouter, Router } from '@angular/router';
import { RouterTestingHarness } from '@angular/router/testing';
import { afterEach, beforeEach, describe, expect, it } from 'vitest';
import { routes } from './app.routes';
import { DemoSession, DEMO_SESSION_KEY } from './services/demo-session';

describe('Exercises: public about and guest guard', () => {
  beforeEach(() => {
    localStorage.removeItem(DEMO_SESSION_KEY);
    TestBed.configureTestingModule({providers: [
      provideRouter(routes), provideHttpClient(), provideHttpClientTesting(),
    ]});
  });
  afterEach(() => {
    TestBed.inject(HttpTestingController).verify();
    localStorage.removeItem(DEMO_SESSION_KEY);
  });
  it('opens /about without entering the demo', async () => {
    const h = await RouterTestingHarness.create('/about');
    expect(TestBed.inject(Router).url).toBe('/about');
    expect(h.routeNativeElement?.textContent).toContain('O aplikacji');
    expect(TestBed.inject(DemoSession).isActive()).toBe(false);
  });
  it('redirects an active session from /login to /weather', async () => {
    TestBed.inject(DemoSession).login();
    await RouterTestingHarness.create('/login');
    const http = TestBed.inject(HttpTestingController);
    const requests = http.match(r => r.url.includes('api.open-meteo.com'));
    expect(requests.length).toBe(2);
    for (const r of requests) r.flush({current: {
      temperature_2m: 10, apparent_temperature: 9,
      relative_humidity_2m: 70, pressure_msl: 1017, time: '2026-11-16T10:00',
    }});
    expect(TestBed.inject(Router).url).toBe('/weather');
  });
  it('still allows an inactive session to open /login', async () => {
    const h = await RouterTestingHarness.create('/login');
    expect(TestBed.inject(Router).url).toBe('/login');
    expect(h.routeNativeElement?.textContent).toContain('Logowanie demonstracyjne');
  });
});
