import { Component, inject } from '@angular/core';
import { Router, RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { DemoSession } from './services/demo-session';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RouterLink, RouterLinkActive],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {
  readonly session = inject(DemoSession);
  private readonly router = inject(Router);

  async logout(): Promise<void> {
    this.session.logout();
    await this.router.navigateByUrl('/login', { replaceUrl: true });
  }
}
