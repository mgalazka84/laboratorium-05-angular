# Laboratorium 7 - 01-start

## Uruchomienie

Node.js 24 LTS >=24.15.0 (sprawdzono 24.22.1).
W terminalu VS Code, w tym katalogu:

```bash
npm ci
npm start
```

Otwórz http://localhost:4200. Zatrzymaj Ctrl+C przed uruchomieniem kolejnego projektu.

```bash
npm run build
npm test -- --watch=false
```

Wersje przypięte: Angular 22.2.6, CLI/build 22.2.7, TypeScript 6.0.3,
RxJS 7.8.2, Bootstrap 5.3.9. Zgodność sprawdzona 16.11.2026.
To klientowa aplikacja standalone, zoneless, bez SSR i NgModule.
Pogoda pochodzi z publicznego API Open-Meteo, bez klucza API.
Testy HTTP używają atrap odpowiedzi i nie wymagają połączenia z API.

01-start to działający punkt wyjścia z laboratorium 6 (dwa miasta).
02-routing zawiera pełny przykład z PDF: trasy, demo sesji, guard i wylogowanie.
03-rozwiazanie dodaje publiczne /about i guestGuard z dwóch zadań.

Sesja demo zapisuje tylko lab07.demo-session=active w localStorage.
Nie ma backendu, hasła, JWT ani rzeczywistego uwierzytelniania.
Po odświeżeniu stan demo jest odczytywany ponownie; wylogowanie usuwa tylko ten klucz.
Projekt zakłada dostępną pamięć localStorage w przeglądarce.
Synchronizacja wielu kart przeglądarki nie jest częścią ćwiczenia.
Na hostingu serwer musi kierować nieplikowe ścieżki aplikacji do index.html.
