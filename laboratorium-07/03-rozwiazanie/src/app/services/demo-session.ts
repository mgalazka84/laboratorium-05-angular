import { Injectable, signal } from '@angular/core';

export const DEMO_SESSION_KEY = 'lab07.demo-session';

@Injectable({ providedIn: 'root' })
export class DemoSession {
  private readonly active = signal(
    localStorage.getItem(DEMO_SESSION_KEY) === 'active',
  );
  readonly isActive = this.active.asReadonly();

  login(): void {
    localStorage.setItem(DEMO_SESSION_KEY, 'active');
    this.active.set(true);
  }

  logout(): void {
    localStorage.removeItem(DEMO_SESSION_KEY);
    this.active.set(false);
  }
}
