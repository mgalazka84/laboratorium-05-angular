import type { City } from './city';
import type { WeatherData } from './weather';

export interface WeatherCardState {
  city: City;
  weather: WeatherData | null;
  loading: boolean;
  error: string | null;
  lastRequestedAt: string | null;
}

export function createCard(city: City): WeatherCardState {
  return {
    city, weather: null, loading: false, error: null,
    lastRequestedAt: null,
  };
}
