import { TestBed } from '@angular/core/testing';
import { Subject } from 'rxjs';
import { Weather } from './weather';
import { WeatherApi } from '../../services/weather-api';
import type { WeatherData } from '../../models/weather';
import { beforeEach, describe, expect, it, vi } from 'vitest';

describe('Weather UI', () => {
  let stream: Subject<WeatherData>;
  let getWeather: ReturnType<typeof vi.fn>;
  beforeEach(() => {
    stream = new Subject<WeatherData>();
    getWeather = vi.fn(() => stream.asObservable());
    TestBed.configureTestingModule({imports: [Weather],
      providers: [{provide: WeatherApi, useValue: {getWeather}}]});
  });
  it('loads on start, disables the button and ignores duplicate refreshes', () => {
    const f = TestBed.createComponent(Weather); f.detectChanges();
    expect(getWeather).toHaveBeenCalledWith(52.4064, 16.9252);
    expect(f.nativeElement.querySelector('button').disabled).toBe(true);
    f.componentInstance.refreshData();
    expect(getWeather).toHaveBeenCalledTimes(1);
  });
  it('shows values and enables refresh after completion', () => {
    const f = TestBed.createComponent(Weather); f.detectChanges();
    stream.next({temperature: 9, apparentTemperature: 8, humidity: 70,
      pressure: 1000, observedAt: '2026-10-30T10:00'});
    stream.complete(); f.detectChanges();
    expect(f.nativeElement.textContent).toContain('9 °C');
    expect(f.nativeElement.textContent).toContain('1000 hPa');
    expect(f.nativeElement.querySelector('button').disabled).toBe(false);
  });
  it('shows an error, stops loading, and supports another attempt', () => {
    const f = TestBed.createComponent(Weather); f.detectChanges();
    stream.error(new Error('offline')); f.detectChanges();
    expect(f.nativeElement.querySelector('[role=alert]').textContent)
      .toContain('Nie udało się');
    expect(f.componentInstance.loading()).toBe(false);
    const next = new Subject<WeatherData>();
    getWeather.mockReturnValue(next.asObservable());
    f.componentInstance.refreshData(); f.detectChanges();
    expect(f.nativeElement.querySelector('[role=alert]')).toBeNull();
    expect(f.componentInstance.loading()).toBe(true);
    next.complete();
  });
  it('cancels a pending subscription when destroyed', () => {
    const f = TestBed.createComponent(Weather); f.detectChanges();
    expect(stream.observed).toBe(true);
    f.destroy();
    expect(stream.observed).toBe(false);
  });
});
