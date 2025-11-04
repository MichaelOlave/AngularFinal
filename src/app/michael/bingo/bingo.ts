import { Component, ViewChild } from '@angular/core';
import { Board } from '../components/board/board';

@Component({
  selector: 'app-bingo',
  templateUrl: './bingo.html',
  styleUrls: ['./bingo.css'],
  imports: [Board],
})
export class Bingo {
  @ViewChild(Board) boardComp?: Board;
  @ViewChild(Board) cpuBoard?: Board;

  addBoard(): void {
    this.boardComp?.loadBoard('gameBoard');
  }
  addCPUBoard(): void {}
}
