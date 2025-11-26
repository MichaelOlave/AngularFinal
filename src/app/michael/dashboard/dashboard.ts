import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-dashboard',
  imports: [RouterLink, MatButtonModule, MatCardModule],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css',
})
export class Dashboard {
  games = [
    {
      title: 'Bingo',
      subtitle: 'Player vs CPU',
      route: '/michael/bingo',
      description:
        "Challenge the CPU in a classic game of bingo. Mark numbers as they're drawn and compete to get a winning pattern first!",
    },
    {
      title: 'Tic-Tac-Toe',
      subtitle: 'Player vs Player',
      route: '/michael/tic-tac-toe',
      description:
        'Play the classic strategy game with a friend. Take turns marking spaces and try to get three in a row!',
    },
    {
      title: 'Starwars-Info',
      subtitle: 'Explore the Star Wars Universe',
      route: '/michael/starwars-info',
      description:
        'Dive into the Star Wars universe and discover information about characters, planets, and starships from the iconic saga.',
    },
  ];
}
