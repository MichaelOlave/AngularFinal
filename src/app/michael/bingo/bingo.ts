import { Component, ViewChild } from '@angular/core';
import { Board } from '../components/board/board';
import { MatButtonModule } from '@angular/material/button';
import { BingoSlider } from '../components/bingo-slider/bingo-slider';

@Component({
  selector: 'app-bingo',
  templateUrl: './bingo.html',
  styleUrls: ['./bingo.css'],
  imports: [Board, MatButtonModule, BingoSlider],
})
export class Bingo {
  @ViewChild(Board) boardComp?: Board;
  @ViewChild(Board) cpuBoard?: Board;

  addBoard(): void {
    this.boardComp?.loadBoard('gameBoard');
  }
  addCPUBoard(): void {}
}
