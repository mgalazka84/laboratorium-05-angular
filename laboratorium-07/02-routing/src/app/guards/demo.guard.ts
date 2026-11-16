import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { DemoSession } from '../services/demo-session';

export const demoGuard: CanActivateFn = () => {
  const session = inject(DemoSession);
  const router = inject(Router);
  return session.isActive() ? true : router.parseUrl('/login');
};
