# Rozwiązanie zadania z prędkością wiatru

Zmiany wprowadzaj w projekcie `02-api`. Zostaje jedno żądanie GET.

1. W `src/app/models/weather.ts` dopisz do `WeatherData`:

```ts
  windSpeed: number;
```

Do `OpenMeteoResponse.current` dopisz:

```ts
    wind_speed_10m: number;
```

2. W `src/app/services/weather-api.ts` do tablicy `current` dopisz:

```ts
        'wind_speed_10m',
```

Do obiektu `params` dopisz jawne ustawienie jednostki:

```ts
      wind_speed_unit: 'kmh',
```

Do obiektu tworzonego przez `map()` dopisz:

```ts
        windSpeed: current.wind_speed_10m,
```

3. W `weather.html`, wewnątrz `@if (weather(); as w)`, dopisz:

```html
        <p>Wiatr: {{ w.windSpeed }} km/h</p>
```

4. Wykonaj `npm run build`, następnie uruchom aplikację i porównaj wynik
z `current.wind_speed_10m` w odpowiedzi w zakładce Network.

Zmiana miasta (zadanie dodatkowe): zastąp w `weather.ts` obiekt city:

```ts
  readonly city = {
    name: 'Warszawa', latitude: 52.2297, longitude: 21.0122,
  };
```

Nie musisz zmieniać widoku ani parametrów oddzielnie - korzystają z tego obiektu.
Jeśli dodajesz wiatr również do projektu lokalnego, uzupełnij `windSpeed`
w początkowym obiekcie i w obiekcie przekazywanym do `weather.set()`.

Testy bazowego projektu opisują cztery parametry pogody. Po rozbudowie dodaj
`wind_speed_10m` do oczekiwanej listy current, uzupełnij odpowiedź testową
serwisu o `wind_speed_10m`, jego wynik o `windSpeed`, a dane testu widoku
o `windSpeed`. Dzięki temu testy będą sprawdzać nowy kontrakt.
