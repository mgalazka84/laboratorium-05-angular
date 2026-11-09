# Laboratorium 6 - Angular standalone: komunikacja komponentów

Trzy kompletne projekty do pracy w Visual Studio Code:

| Folder | Zawartość |
| --- | --- |
| `01-lokalny` | Rodzic i karty, input(), output(), dane przykładowe bez żądań API |
| `02-api` | Dwie karty, pobieranie przez serwis, niezależne odświeżanie i błędy |
| `03-rozwiazanie` | Trzy miasta oraz czas wysłania ostatniego żądania w każdej karcie |

## Wymagania i uruchomienie

Wersje sprawdzone 09.11.2026: Angular 22.2.5, Angular CLI 22.2.6,
TypeScript 6.0.3, RxJS 7.8.2, Bootstrap 5.3.8.
Node.js 24 LTS >=24.15.0; weryfikacja na 24.22.1 i npm 11.9.0.

Otwórz w VS Code wybrany folder projektu. W jego terminalu wykonaj:

```sh
npm ci
npm start
```

Otwórz http://localhost:4200. Zatrzymanie: Ctrl+C.
Każdy projekt ma osobną instalację zależności. Uruchamiaj jeden na porcie 4200.
Projekty są kompletne: nie trzeba wykonywać ng new ani instalować CLI globalnie.

## Praca na zajęciach

W 01-lokalny dane są przykładowe; przycisk losuje wartości tylko dla wskazanego miasta.
Karta WeatherCard ma wejścia typu signal input oraz output<string>() z id miasta.
Kontener WeatherDashboard zarządza stanem. W 02-api wykorzystuje WeatherApi
z HttpClient; przycisk w dziecku sam nie wysyła żądania.
Karta, modele, konfiguracja i szablony są wspólne w dwóch pierwszych etapach.
Serwis HTTP jest przygotowany w obu projektach, ale w 01-lokalny nie jest wywoływany.

Na zajęciach rozbuduj 02-api: dodaj Warszawę oraz lastRequestedAt.
Wskazówki są w instrukcji PDF. Po własnej próbie porównaj 03-rozwiazanie.
observedAt oznacza czas danych API; lastRequestedAt oznacza czas rozpoczęcia próby,
również zakończonej błędem. Data w widoku jest formatowana w strefie przeglądarki.

## Kontrola

```sh
npm run build
npm test -- --watch=false
```

02-api ma 10 testów zachowania: przekazywanie id, wejścia i stan ładowania,
izolacja odświeżenia i błędu, ponowienie, blokada duplikatu i anulowanie żądań.
Testy używają backendu testowego HTTP i nie wymagają sieci. Samo działanie API
sprawdź w przeglądarce: w Network kliknięcie jednej karty ma wysłać jedno żądanie.

## Struktura

- src/app/components/weather-card/: wspólny widok pojedynczego miasta.
- src/app/components/weather-dashboard/: stan kart i obsługa zdarzeń.
- src/app/models/: typ miasta, pogody i stanu.
- src/app/services/weather-api.ts: żądanie i mapowanie JSON-u.
- src/app/app.config.ts: konfiguracja usług przez providers.
- src/app/app.ts: komponent główny, który importuje kontener.

Nie zmieniaj wymaganych wejść w any, aby uciszyć błędy. Sprawdź wiązania i typy.
Nie uruchamiaj komponentów przez node plik.ts; przetwarza je Angular CLI.
Nie oddawaj node_modules, dist ani .angular. Zachowaj package-lock.json.

## Dokumentacja

- https://angular.dev/guide/components/inputs
- https://angular.dev/guide/components/outputs
- https://angular.dev/guide/templates/control-flow
- https://angular.dev/guide/signals
- https://angular.dev/guide/http/setup
- https://angular.dev/api/common/DatePipe
- https://open-meteo.com/en/docs

Open-Meteo dostarcza dane modelowe. Publiczny endpoint w tym przykładzie nie wymaga
klucza API. Dane mogą nie zmienić się po odświeżeniu. Informacja o źródle
i licencji CC BY 4.0 znajduje się w szablonie kontenera.
