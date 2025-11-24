import { Component } from '@angular/core';
import { PagePreview } from '../components/page-preview/page-preview';
import { Presentation } from '../presentation/presentation';
import { Dashboard } from '../oskar/dashboard/dashboard';
import { Bingo } from '../michael/bingo/bingo';
import { TicTacToe } from '../michael/tic-tac-toe/tic-tac-toe';
import { StarwarsInfo } from '../michael/starwars-info/starwars-info';
import { Mineclick } from '../sean/components/mineclick/mineclick';

@Component({
  selector: 'app-projectgallery',
  imports: [PagePreview],
  templateUrl: './projectgallery.html',
  styleUrl: './projectgallery.css',
})
export class Projectgallery {
  pages = [
    {
      title: 'Presentation',
      component: Presentation,
      route: '/',
    },
    {
      title: 'Tic-tac-toe',
      component: TicTacToe,
      route: '/michael/tic-tac-toe',
    },
    {
      title: 'Bingo',
      component: Bingo,
      route: '/michael/bingo',
    },
    {
      title: 'Starwars-info',
      component: StarwarsInfo,
      route: '/michael/starwars-info',
    },
    {
      title: 'Mineclicker',
      component: Mineclick,
      route: '/sean/dashboard',
    },
    {
      title: 'Oskar-Dashboard',
      component: Dashboard,
      route: '/oskar/dashboard',
    },
  ];
}
