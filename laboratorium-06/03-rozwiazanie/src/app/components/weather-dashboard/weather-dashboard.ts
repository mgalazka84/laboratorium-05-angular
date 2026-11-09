import {
  Component, DestroyRef, inject, OnInit, signal,
} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { finalize } from 'rxjs';
import { CITIES } from '../../models/city';
import {
  createCard, type WeatherCardState,
} from '../../models/weather-card-state';
import { WeatherApi } from '../../services/weather-api';
import { WeatherCard } from '../weather-card/weather-card';

@Component({
  selector: 'app-weather-dashboard',
  standalone: true,
  imports: [WeatherCard],
  templateUrl: './weather-dashboard.html',
  styleUrl: './weather-dashboard.css',
})
export class WeatherDashboard implements OnInit {
  private readonly api = inject(WeatherApi);
  private readonly destroyRef = inject(DestroyRef);
  readonly cards = signal<WeatherCardState[]>(CITIES.map(createCard));

  ngOnInit(): void {
    for (const card of this.cards()) this.refreshCity(card.city.id);
  }

  refreshCity(cityId: string): void {
    const card = this.cards().find(item => item.city.id === cityId);
    if (!card || card.loading) return;
    this.updateCard(cityId, {
      loading: true, error: null, weather: null,
      lastRequestedAt: new Date().toISOString(),
    });

    this.api.getWeather(card.city).pipe(
      takeUntilDestroyed(this.destroyRef),
      finalize(() => this.updateCard(cityId, { loading: false })),
    ).subscribe({
      next: weather => this.updateCard(cityId, { weather }),
      error: () => this.updateCard(cityId, {
        error: 'Nie udało się pobrać pogody. Spróbuj ponownie.',
      }),
    });
  }

  private updateCard(
    cityId: string, changes: Partial<WeatherCardState>,
  ): void {
    this.cards.update(cards => cards.map(card =>
      card.city.id === cityId ? { ...card, ...changes } : card,
    ));
  }
}
