import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    title: 'Getting started · ngx-gorilla-ui',
    loadComponent: () =>
      import('./pages/getting-started/getting-started').then((m) => m.GettingStarted),
  },
  { path: '**', redirectTo: '' },
];
