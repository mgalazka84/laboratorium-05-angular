import { TestBed } from '@angular/core/testing';
import { describe, expect, it } from 'vitest';
import { CITIES } from '../../models/city';
import { WeatherDashboard } from './weather-dashboard';

describe('Local component communication', () => {
  it('updates only the card identified by its child output', () => {
    const f = TestBed.createComponent(WeatherDashboard); f.detectChanges();
    expect(f.nativeElement.querySelectorAll('article').length).toBe(CITIES.length);
    const old = f.componentInstance.cards();
    f.nativeElement.querySelectorAll('article button')[0].click();
    f.detectChanges();
    const current = f.componentInstance.cards();
    expect(current[0]).not.toBe(old[0]);
    expect(current[1]).toBe(old[1]);
    expect(current[0].city.id).toBe(CITIES[0].id);
  });
});
