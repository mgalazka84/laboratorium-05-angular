import { TestBed } from '@angular/core/testing';
import { describe, expect, it, vi } from 'vitest';
import { CITIES } from '../../models/city';
import { WeatherCard } from './weather-card';

describe('WeatherCard contract', () => {
  it('renders the supplied city and emits its id after a click', () => {
    const f = TestBed.createComponent(WeatherCard);
    f.componentRef.setInput('city', CITIES[0]);
    f.detectChanges();
    const listener = vi.fn();
    f.componentInstance.refreshRequested.subscribe(listener);
    expect(f.nativeElement.querySelector('h2').textContent).toContain('Poznań');
    f.nativeElement.querySelector('button').click();
    expect(listener).toHaveBeenCalledWith('poznan');
  });
  it('disables refresh and exposes the loading state', () => {
    const f = TestBed.createComponent(WeatherCard);
    f.componentRef.setInput('city', CITIES[0]);
    f.componentRef.setInput('loading', true);
    f.detectChanges();
    const listener = vi.fn();
    f.componentInstance.refreshRequested.subscribe(listener);
    f.nativeElement.querySelector('button').click();
    expect(listener).not.toHaveBeenCalled();
    expect(f.nativeElement.querySelector('[role=status]')).not.toBeNull();
  });
});
