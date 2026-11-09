import { Component, signal } from '@angular/core';
import { CITIES } from '../../models/city';
import {
  createCard, type WeatherCardState,
} from '../../models/weather-card-state';
import { WeatherCard } from '../weather-card/weather-card';

@Component({
  selector: 'app-weather-dashboard',
  standalone: true,
  imports: [WeatherCard],
  templateUrl: './weather-dashboard.html',
  styleUrl: './weather-dashboard.css',
})
export class WeatherDashboard {
  readonly cards = signal<WeatherCardState[]>(
    CITIES.map(city => ({
      ...createCard(city),
      weather: { temperature: 9, apparentTemperature: 8,
        humidity: 72, pressure: 1017, observedAt: 'Dane przykładowe' },
    })),
  );

  refreshCity(cityId: string): void {
    this.cards.update(cards => cards.map(card =>
      card.city.id === cityId ? {
        ...card,
        weather: {
          temperature: Math.floor(Math.random() * 31),
          apparentTemperature: Math.floor(Math.random() * 31),
          humidity: Math.floor(Math.random() * 101),
          pressure: 980 + Math.floor(Math.random() * 61),
          observedAt: 'Dane przykładowe po odświeżeniu',
        },
      } : card,
    ));
  }
}
