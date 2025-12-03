import { Routes } from '@angular/router';
import { AuthGuard } from './guards/auth-guard';  

export const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  {
    path: 'login',
    loadComponent: () =>
      import('./pages/login/login.page').then(m => m.LoginPage),
  },
  {
    path: 'home',
    canActivate: [AuthGuard],  
    loadComponent: () =>
      import('./pages/home/home.page').then(m => m.HomePage),
  },
  {
    path: 'home/profile',
    canActivate: [AuthGuard],  
    loadComponent: () =>
      import('./pages/home/profile/profile.page').then(m => m.ProfilePage),
  },

  {
    path: 'settings',
    canActivate: [AuthGuard], 
    loadComponent: () =>
      import('./pages/settings/settings.page').then(m => m.SettingsPage),
  },
];
