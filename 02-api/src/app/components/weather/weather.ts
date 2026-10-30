import {
  Component, DestroyRef, inject, OnInit, signal,
} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { finalize } from 'rxjs';
import type { WeatherData } from '../../models/weather';
import { WeatherApi } from '../../services/weather-api';

@Component({
  selector: 'app-weather',
  standalone: true,
  templateUrl: './weather.html',
  styleUrl: './weather.css',
})
export class Weather implements OnInit {
  private readonly api = inject(WeatherApi);
  private readonly destroyRef = inject(DestroyRef);
  readonly city = {
    name: 'Poznań', latitude: 52.4064, longitude: 16.9252,
  };
  readonly weather = signal<WeatherData | null>(null);
  readonly loading = signal(false);
  readonly error = signal<string | null>(null);

  ngOnInit(): void {
    this.refreshData();
  }

  refreshData(): void {
    if (this.loading()) return;
    this.loading.set(true);
    this.error.set(null);
    this.weather.set(null);

    this.api.getWeather(this.city.latitude, this.city.longitude).pipe(
      takeUntilDestroyed(this.destroyRef),
      finalize(() => this.loading.set(false)),
    ).subscribe({
      next: (data) => this.weather.set(data),
      error: () => this.error.set(
        'Nie udało się pobrać pogody. Spróbuj ponownie.',
      ),
    });
  }
}
