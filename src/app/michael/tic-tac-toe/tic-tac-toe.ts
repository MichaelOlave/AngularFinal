import { Component } from '@angular/core';
import { TicTacToeBoard } from '../components/tic-tac-toe-board/tic-tac-toe-board';

@Component({
  selector: 'app-tic-tac-toe',
  imports: [TicTacToeBoard],
  templateUrl: './tic-tac-toe.html',
  styleUrl: './tic-tac-toe.css',
})
export class TicTacToe {}
