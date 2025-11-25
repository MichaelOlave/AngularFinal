import { Component, ViewChild, ViewChildren, QueryList, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Board } from '../components/bingo/board/board';
import { MatButtonModule } from '@angular/material/button';
import { BingoSlider } from '../components/bingo/bingo-slider/bingo-slider';
import { CpuBoard } from '../components/bingo/cpu-board/cpu-board';
import { BingoBallSpinner } from '../components/bingo/bingo-ball-spinner/bingo-ball-spinner';
import { timeout } from 'rxjs';

@Component({
  selector: 'app-bingo',
  templateUrl: './bingo.html',
  styleUrls: ['./bingo.css'],
  imports: [Board, MatButtonModule, BingoSlider, CpuBoard, CommonModule, BingoBallSpinner],
})
export class Bingo implements OnInit {
  @ViewChild('boardComp', { read: Board })
  boardComp?: Board;
  @ViewChildren('cpuBoardRefs') cpuBoards?: QueryList<CpuBoard>;
  @ViewChild('bingoSpinner') bingoSpinner!: BingoBallSpinner;

  numberOfCPUBoards = 2;
  cpuBoardList: number[] = [];

  initializeBoardList(): void {
    this.cpuBoardList = Array.from({ length: this.numberOfCPUBoards }, (_, i) => i);
  }

  ngOnInit(): void {
    this.initializeBoardList();
  }

  resetPlayerBoard(): void {
    this.boardComp?.resetBoard();
  }

  rebuildCPUBoards(): void {
    this.cpuBoards?.forEach((cpuBoard) => {
      cpuBoard.initializeBoard();
    });
  }

  setCPUBoardCount(count: number): void {
    this.numberOfCPUBoards = count;
    this.initializeBoardList();

    queueMicrotask(() => {
      this.cpuBoards?.forEach((board) => board.initializeBoard());
    });
  }

  intervalId: any;

  onStartGame(): void {
    if (this.intervalId) return; // prevents double-starts

    Board.gameRunning = true;

    this.intervalId = setInterval(() => {
      // Stop loop if gameRunning becomes false
      if (!Board.gameRunning) {
        this.endGame();
        return;
      }

      this.bingoSpinner.open(); // roll a new ball
    }, 10000);
  }

  endGame(): void {
    clearInterval(this.intervalId);
    this.intervalId = null;
    console.log('Game ended.');
  }

  onBallRolled(rolledNumber: number): void {
    queueMicrotask(() => {
      this.cpuBoards?.forEach((board) => board.checkForNumber(rolledNumber));
    });
  }
}
