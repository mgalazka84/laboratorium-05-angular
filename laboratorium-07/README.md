# Laboratorium 7 - Angular standalone: routing

Materiał na 90 minut, aktualizacja 16.11.2026.

| Katalog | Przeznaczenie |
| --- | --- |
| 01-start | Działający projekt pogodowy z lab. 6, punkt wyjścia do pracy według PDF. |
| 02-routing | Gotowy przykład: /weather, /login, przekierowanie /, widok 404, sesja demo i guard. |
| 03-rozwiazanie | Przykład i dwa zadania: publiczne /about oraz przekierowanie aktywnej sesji z /login. |

Każdy katalog zawiera niezależny projekt i własny package-lock.json.
Rozpakuj ZIP, otwórz wybrany katalog w VS Code i wykonaj `npm ci`, potem `npm start`.
Nie uruchamiaj plików Angulara przez `node plik.ts`.
Rozwiązania porównaj dopiero po samodzielnej próbie.

W każdym projekcie: `npm run build` oraz `npm test -- --watch=false`.

Sesja jest wyłącznie demonstracją stanu klienta. Guard nie zabezpiecza API.
W realnej aplikacji serwer uwierzytelnia użytkownika i sprawdza uprawnienia.
Dane pogodowe: [Open-Meteo](https://open-meteo.com/), bez klucza w tym ćwiczeniu.

## Weryfikacja 16.11.2026

Build produkcyjny przeszedł dla wszystkich trzech projektów. Testy: 01-start 10/10, 02-routing 21/21, 03-rozwiazanie 24/24. Sprawdzono też kompilację pośredniego etapu routingu bez sesji, opisanego w PDF.
