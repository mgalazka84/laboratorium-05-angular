import { TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { provideRouter, Router } from '@angular/router';
import { RouterTestingHarness } from '@angular/router/testing';
import { afterEach, beforeEach, describe, expect, it } from 'vitest';
import { routes } from './app.routes';
import { App } from './app';
import { Login } from './pages/login/login';
import { DemoSession, DEMO_SESSION_KEY } from './services/demo-session';
import { CITIES } from './models/city';

describe('Lab 7 routing integration', () => {
  let http: HttpTestingController;
  let router: Router;
  beforeEach(() => {
    localStorage.removeItem(DEMO_SESSION_KEY);
    TestBed.configureTestingModule({providers: [
      provideRouter(routes), provideHttpClient(), provideHttpClientTesting(),
    ]});
    http = TestBed.inject(HttpTestingController);
    router = TestBed.inject(Router);
  });
  afterEach(() => {
    http.verify({ignoreCancelled: true});
    localStorage.removeItem(DEMO_SESSION_KEY);
  });
  function flushWeather() {
    const requests = http.match(r => r.url.includes('api.open-meteo.com'));
    expect(requests.length).toBe(CITIES.length);
    for (const r of requests) r.flush({current: {
      temperature_2m: 10, apparent_temperature: 9,
      relative_humidity_2m: 70, pressure_msl: 1017, time: '2026-11-16T10:00',
    }});
  }
  it('redirects / through /weather to /login without fetching weather', async () => {
    const h = await RouterTestingHarness.create('/');
    expect(router.url).toBe('/login');
    expect(h.routeNativeElement?.textContent).toContain('Logowanie demonstracyjne');
    http.expectNone(r => r.url.includes('api.open-meteo.com'));
  });
  it('blocks a direct protected URL before the weather component starts', async () => {
    await RouterTestingHarness.create('/weather');
    expect(router.url).toBe('/login');
    http.expectNone(r => r.url.includes('api.open-meteo.com'));
  });
  it('allows a stored demo session and renders one card per city', async () => {
    localStorage.setItem(DEMO_SESSION_KEY, 'active');
    const h = await RouterTestingHarness.create('/weather');
    flushWeather(); h.detectChanges();
    expect(router.url).toBe('/weather');
    expect(h.routeNativeElement?.querySelectorAll('article').length).toBe(CITIES.length);
    expect(document.title).toBe('Pogoda | Lab 7');
  });
  it('the demo login persists state and navigates to weather', async () => {
    const h = await RouterTestingHarness.create();
    const login = await h.navigateByUrl('/login', Login);
    await login.enterDemo(); h.detectChanges();
    flushWeather(); h.detectChanges();
    expect(router.url).toBe('/weather');
    expect(localStorage.getItem(DEMO_SESSION_KEY)).toBe('active');
    expect(h.routeNativeElement?.textContent).toContain('Poznań');
  });
  it('unknown routes reach 404 instead of the empty-path redirect', async () => {
    const h = await RouterTestingHarness.create('/does-not-exist');
    expect(router.url).toBe('/does-not-exist');
    expect(h.routeNativeElement?.textContent).toContain('404');
    http.expectNone(r => r.url.includes('api.open-meteo.com'));
  });
  it('logout hides the action and blocks the previous protected URL', async () => {
    TestBed.inject(DemoSession).login();
    const f = TestBed.createComponent(App);
    f.detectChanges();
    await router.navigateByUrl('/weather'); f.detectChanges();
    flushWeather(); f.detectChanges();
    expect(f.nativeElement.textContent).toContain('Wyloguj z demo');
    await f.componentInstance.logout(); f.detectChanges();
    expect(router.url).toBe('/login');
    expect(f.nativeElement.textContent).not.toContain('Wyloguj z demo');
    await router.navigateByUrl('/weather');
    expect(router.url).toBe('/login');
    http.expectNone(r => r.url.includes('api.open-meteo.com'));
  });
  it('navigation away from weather cancels unfinished HTTP requests', async () => {
    TestBed.inject(DemoSession).login();
    const h = await RouterTestingHarness.create('/weather');
    const requests = http.match(r => r.url.includes('api.open-meteo.com'));
    expect(requests.length).toBe(CITIES.length);
    await h.navigateByUrl('/does-not-exist');
    expect(requests.every(r => r.cancelled)).toBe(true);
  });
});
