import { Component } from '@angular/core';

@Component({
  selector: 'app-about',
  standalone: true,
  template: `
    <section class="container py-5">
      <h1>O aplikacji</h1>
      <p>Laboratorium 7: routing, guard i sesja demonstracyjna.</p>
      <p>Dane pogodowe: Open-Meteo. Sesja demo nie uwierzytelnia użytkownika.</p>
    </section>
  `,
})
export class About {}
