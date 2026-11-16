import { Routes } from '@angular/router';
import { demoGuard } from './guards/demo.guard';
import { Login } from './pages/login/login';

export const routes: Routes = [
  { path: '', redirectTo: 'weather', pathMatch: 'full' },
  {
    path: 'weather',
    title: 'Pogoda | Lab 7',
    canActivate: [demoGuard],
    loadComponent: () => import(
      './components/weather-dashboard/weather-dashboard'
    ).then(m => m.WeatherDashboard),
  },
  { path: 'login', title: 'Logowanie demo | Lab 7', component: Login },
  {
    path: '**',
    title: 'Nie znaleziono widoku | Lab 7',
    loadComponent: () => import(
      './pages/not-found/not-found'
    ).then(m => m.NotFound),
  },
];
