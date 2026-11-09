import { DatePipe } from '@angular/common';
import { Component, input, output } from '@angular/core';
import type { City } from '../../models/city';
import type { WeatherData } from '../../models/weather';

@Component({
  selector: 'app-weather-card',
  standalone: true,
  imports: [DatePipe],
  templateUrl: './weather-card.html',
  styleUrl: './weather-card.css',
})
export class WeatherCard {
  readonly city = input.required<City>();
  readonly weather = input<WeatherData | null>(null);
  readonly loading = input(false);
  readonly error = input<string | null>(null);
  readonly lastRequestedAt = input<string | null>(null);
  readonly refreshRequested = output<string>();

  requestRefresh(): void {
    this.refreshRequested.emit(this.city().id);
  }
}
