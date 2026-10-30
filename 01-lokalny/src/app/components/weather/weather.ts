import { Component, signal } from '@angular/core';
import type { WeatherData } from '../../models/weather';

@Component({
  selector: 'app-weather',
  standalone: true,
  templateUrl: './weather.html',
  styleUrl: './weather.css',
})
export class Weather {
  readonly city = {
    name: 'Poznań', latitude: 52.4064, longitude: 16.9252,
  };
  readonly weather = signal<WeatherData>({
    temperature: 9, apparentTemperature: 8,
    humidity: 72, pressure: 1017, observedAt: 'Dane przykładowe',
  });

  refreshData(): void {
    this.weather.set({
      temperature: Math.floor(Math.random() * 31),
      apparentTemperature: Math.floor(Math.random() * 31),
      humidity: Math.floor(Math.random() * 101),
      pressure: 980 + Math.floor(Math.random() * 61),
      observedAt: 'Dane przykładowe po odświeżeniu',
    });
  }
}
