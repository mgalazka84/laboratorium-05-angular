import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { DemoSession } from '../../services/demo-session';

@Component({
  selector: 'app-login',
  standalone: true,
  templateUrl: './login.html',
})
export class Login {
  private readonly session = inject(DemoSession);
  private readonly router = inject(Router);

  async enterDemo(): Promise<void> {
    this.session.login();
    await this.router.navigateByUrl('/weather', { replaceUrl: true });
  }
}
