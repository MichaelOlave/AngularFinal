import { Component, ViewChild } from '@angular/core';
import { Board } from '../components/board/board';
import { MatAnchor } from '@angular/material/button';
import { BingoSlider } from '../components/bingo-slider/bingo-slider';

@Component({
  selector: 'app-bingo',
  templateUrl: './bingo.html',
  styleUrls: ['./bingo.css'],
  imports: [Board, MatAnchor, BingoSlider],
})
export class Bingo {
  @ViewChild(Board) boardComp?: Board;
  @ViewChild(Board) cpuBoard?: Board;

  addBoard(): void {
    this.boardComp?.loadBoard('gameBoard');
  }
  addCPUBoard(): void {}
}
