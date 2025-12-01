import { Component } from '@angular/core';
import { PagePreview } from '../page-preview/page-preview';
import { TicTacToe } from '../../michael/tic-tac-toe/tic-tac-toe';
import { Bingo } from '../../michael/bingo/bingo';
import { StarwarsInfo } from '../../michael/starwars-info/starwars-info';
import { Mineclick } from '../../sean/components/mineclick/mineclick';
import { Dashboard } from '../../oskar/dashboard/dashboard';

@Component({
  selector: 'app-projectgallery',
  imports: [PagePreview],
  templateUrl: './projectgallery.html',
  styleUrl: './projectgallery.css',
})
export class Projectgallery {
  pages = [
    {
      title: 'Tic-Tac-Toe',
      component: TicTacToe,
      route: '/michael/tic-tac-toe',
      author: 'Michael Olave',
    },
    {
      title: 'Bingo',
      component: Bingo,
      route: '/michael/bingo',
      author: 'Michael Olave',
    },
    {
      title: 'Starwars-Info',
      component: StarwarsInfo,
      route: '/michael/starwars-info',
      author: 'Michael Olave',
    },
    {
      title: 'Mineclick',
      component: Mineclick,
      route: '/sean/dashboard',
      author: 'Sean',
    },
    {
      title: 'Oskar-Dashboard',
      component: Dashboard,
      route: '/oskar/dashboard',
      author: 'Oskar',
    },
  ];
}
