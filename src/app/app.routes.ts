import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    loadComponent: async () => {
      const m = await import('./presentation/presentation');
      return m.Presentation;
    },
  },
  {
    path: 'presentation',
    loadComponent: async () => {
      const m = await import('./presentation/presentation');
      return m.Presentation;
    },
  },
  {
    path: 'michael/dashboard',
    loadComponent: async () => {
      const m = await import('./michael/dashboard/dashboard');
      return m.Dashboard;
    },
  },
  {
    path: 'michael/bingo',
    loadComponent: async () => {
      const m = await import('./michael/bingo/bingo');
      return m.Bingo;
    },
  },
  {
    path: 'michael/tic-tac-toe',
    loadComponent: async () => {
      const m = await import('./michael/tic-tac-toe/tic-tac-toe');
      return m.TicTacToe;
    },
  },
  {
    path: 'michael/starwars-info',
    loadComponent: async () => {
      const m = await import('./michael/starwars-info/starwars-info');
      return m.StarwarsInfo;
    },
  },
  {
    path: 'yeskey/dashboard',
    loadComponent: async () => {
      const m = await import('./yeskey/dashboard/dashboard');
      return m.Dashboard;
    },
  },
  {
    path: 'sean/dashboard',
    loadComponent: async () => {
      const m = await import('./sean/dashboard/dashboard');
      return m.Dashboard;
    },
  },
  {
    path: 'oskar/dashboard',
    loadComponent: async () => {
      const m = await import('./oskar/dashboard/dashboard');
      return m.Dashboard;
    },
  },
];
