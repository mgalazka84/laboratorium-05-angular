# Laboratorium 5 - Angular standalone: aplikacja pogodowa

Kod do zajęć w Visual Studio Code. Dwa kompletne projekty pozwalają przejść
od danych lokalnych do pobierania pogody z API.

## Pobranie dla studentów

Kliknij zielony przycisk **Code**, a następnie **Download ZIP**.
Wypakuj archiwum i otwórz w VS Code jeden z podfolderów:

| Folder | Zawartość |
| --- | --- |
| `01-lokalny` | Dane przykładowe, sygnały i odświeżanie przyciskiem |
| `02-api` | Open-Meteo, serwis HTTP, stan ładowania i obsługa błędów |
| `Rozwiazanie_wiatr.md` | Rozwiązanie zadania z prędkością wiatru |

## Szybki start

W terminalu w wybranym katalogu aplikacji (tym z `package.json`):

```sh
npm ci
npm start
```

Otwórz **http://localhost:4200**. Zatrzymanie serwera: **Ctrl+C**.
Zależności muszą zostać zainstalowane oddzielnie dla każdego projektu.
Uruchamiaj jeden projekt na porcie 4200. Nie trzeba instalować Angular CLI globalnie.

## Wersje środowiska

Stan wersji sprawdzony 30.10.2026: Angular 22.2.4, CLI 22.2.5,
TypeScript 6.0.3, RxJS 7.8.2, Bootstrap 5.3.8. Node.js 24 LTS >=24.15.0.
Weryfikacja wykonana na Node.js 24.22.1 i npm 11.9.0.

## Uruchomienie w Visual Studio Code

1. Otwórz wybrany folder projektu: `01-lokalny` lub `02-api`.
2. W terminalu w tym folderze wykonaj `npm ci`.
3. Uruchom `npm start`, otwórz http://localhost:4200.
4. Zatrzymanie serwera: Ctrl+C. Uruchamiaj jeden projekt na porcie 4200.

Projekty są kompletne: nie wymagają `ng new` ani generowania komponentów.
`01-lokalny` zawiera wariant danych przykładowych i losowania przyciskiem.
`02-api` zawiera wariant z HTTP, ładowaniem, błędem i ponowieniem.
Model, serwis HTTP i konfiguracja są wspólne; w etapie lokalnym serwis nie
jest wywoływany przez komponent. Aby przejść samodzielnie między etapami,
zastąp dwa pliki `components/weather/weather.ts` i `weather.html` kodem z PDF.

## Praca na zajęciach

Kroki i kompletne przykłady znajdują się w instrukcji PDF. Zadanie końcowe:
dodaj `wind_speed_10m` do jednego żądania, zmapuj na `windSpeed` i pokaż km/h.
Najpierw spróbuj samodzielnie; plik `Rozwiazanie_wiatr.md` zawiera wskazówki
i komplet wymaganych zmian. Routing i własny backend nie są potrzebne.

## Kontrola

`npm run build` sprawdza kompilację i szablony. Zachowanie sprawdź w przeglądarce:
udane pobranie, ładowanie przy wolnej sieci, błąd po odłączeniu sieci i ponowienie.
Przykład API przed rozbudową ma również testy: `npm test -- --watch=false`.
W `02-api` to sześć testów serwisu i widoku. Po zmianie kontraktu w zadaniu
zaktualizuj również dane testowe i listę oczekiwanych parametrów.

`package-lock.json` zachowuje sprawdzone wersje; instalacja: `npm ci`.
Nie uruchamiaj komponentu poleceniem `node weather.ts`; przetwarza go Angular CLI.
Nie dołączaj node_modules, dist ani .angular do oddawanej pracy.

## API i dokumentacja

Open-Meteo: https://open-meteo.com/en/docs
Publiczny endpoint w tym przykładzie nie wymaga konta ani klucza.
Dane modelowe mogą nie zmienić się po kolejnym żądaniu. Informacja o źródle
i licencji CC BY 4.0 znajduje się w szablonie.
Angular: https://angular.dev/guide/components
Wersje: https://angular.dev/reference/versions
Sygnały: https://angular.dev/guide/signals
HTTP: https://angular.dev/guide/http/making-requests
Aktualizacja: https://angular.dev/update-guide
Bootstrap: https://getbootstrap.com/docs/5.3/getting-started/introduction/


## Licencja

Kod udostępniono na licencji MIT.
