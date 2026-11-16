import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import type { City } from '../models/city';
import type { OpenMeteoResponse, WeatherData } from '../models/weather';

@Injectable({ providedIn: 'root' })
export class WeatherApi {
  private readonly http = inject(HttpClient);
  private readonly url = 'https://api.open-meteo.com/v1/forecast';

  getWeather(city: City): Observable<WeatherData> {
    const params = {
      latitude: city.latitude, longitude: city.longitude,
      current: [
        'temperature_2m', 'apparent_temperature',
        'relative_humidity_2m', 'pressure_msl',
      ].join(','),
      timezone: 'Europe/Warsaw',
    };
    return this.http.get<OpenMeteoResponse>(this.url, { params }).pipe(
      map(({ current }) => ({
        temperature: current.temperature_2m,
        apparentTemperature: current.apparent_temperature,
        humidity: current.relative_humidity_2m,
        pressure: current.pressure_msl,
        observedAt: current.time,
      })),
    );
  }
}
