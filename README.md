# Laboratoria 5 i 6 - Angular standalone

Kod dla studentów do pracy w Visual Studio Code.

## Pobranie i wybór projektu

Kliknij **Code → Download ZIP**, wypakuj archiwum i wybierz folder z tabeli.

| Laboratorium | Folder projektu | Zawartość |
| --- | --- | --- |
| 5 | [01-lokalny](01-lokalny) | Dane przykładowe, sygnały i odświeżanie |
| 5 | [02-api](02-api) | Pogoda z Open-Meteo, ładowanie i obsługa błędów |
| 6 | [laboratorium-06/01-lokalny](laboratorium-06/01-lokalny) | Komunikacja rodzic-dziecko, input() i output() bez API |
| 6 | [laboratorium-06/02-api](laboratorium-06/02-api) | Kontener i karty miast, niezależne żądania HTTP |
| 6 | [laboratorium-06/03-rozwiazanie](laboratorium-06/03-rozwiazanie) | Rozwiązanie: trzy miasta i czas wysłania zapytania |

## Uruchomienie

W terminalu **wybranego projektu**, czyli w folderze z `package.json`:

```sh
npm ci
npm start
```

Otwórz http://localhost:4200. Zatrzymanie serwera: **Ctrl+C**.
Każdy projekt wymaga osobnej instalacji zależności. Uruchamiaj jeden projekt
na porcie 4200. Projekty są kompletne; nie wykonuj ponownie `ng new`.
Globalna instalacja Angular CLI nie jest potrzebna.

Przykład dla laboratorium 6, po wejściu do głównego katalogu repozytorium:

```sh
cd laboratorium-06/02-api
npm ci
npm start
```

## Laboratorium 5 - aplikacja pogodowa

Rozpocznij od `01-lokalny`, a następnie przejdź do `02-api`.
Zadanie polega na dodaniu prędkości wiatru. Wskazówki i rozwiązanie:
[Rozwiazanie_wiatr.md](Rozwiazanie_wiatr.md).

Wersje sprawdzone 30.10.2026: Angular 22.2.4 i Angular CLI 22.2.5.

## Laboratorium 6 - komunikacja między komponentami

Szczegółowy opis: [laboratorium-06/README.md](laboratorium-06/README.md).

Rodzic `WeatherDashboard` przechowuje stan. Dziecko `WeatherCard` otrzymuje
wejścia i emituje identyfikator miasta przez `output<string>()`.
Odświeżenie jednej karty dotyczy tylko jej miasta.

Zadania: dodanie trzeciego miasta i czasu rozpoczęcia ostatniego żądania.
Po własnej próbie porównaj `03-rozwiazanie`.

Wersje sprawdzone 09.11.2026: Angular 22.2.5 i Angular CLI 22.2.6.

## Środowisko i kontrola

Node.js 24 LTS >=24.15.0, TypeScript 6.0.3, RxJS 7.8.2, Bootstrap 5.3.8.
`package-lock.json` zachowuje dokładne wersje; instaluj przez `npm ci`.

```sh
npm run build
npm test -- --watch=false
```

W `02-api` laboratorium 5 jest 6 testów, a w `laboratorium-06/02-api` 10 testów.
Testy HTTP używają backendu testowego i nie wymagają połączenia z API.
Zachowanie w przeglądarce sprawdź dodatkowo: pobieranie, blokadę przycisku,
błąd sieci i ponowienie. Nie uruchamiaj komponentów przez `node plik.ts`.
Do oddawanej pracy nie dołączaj `node_modules`, `dist` ani `.angular`.

## Źródło danych i dokumentacja

Przykłady korzystają z [Open-Meteo](https://open-meteo.com/en/docs), bez klucza API.
Są to dane modelowe; kolejne żądanie może zwrócić te same wartości.
Informacja o źródle i licencji CC BY 4.0 znajduje się w szablonach.

- [Komponenty Angular](https://angular.dev/guide/components)
- [Wejścia input()](https://angular.dev/guide/components/inputs)
- [Zdarzenia output()](https://angular.dev/guide/components/outputs)
- [Zgodność wersji](https://angular.dev/reference/versions)

## Licencja

Kod udostępniono na licencji [MIT](LICENSE).
