import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { DemoSession } from '../services/demo-session';

export const guestGuard: CanActivateFn = () => {
  const session = inject(DemoSession);
  const router = inject(Router);
  return session.isActive() ? router.parseUrl('/weather') : true;
};
