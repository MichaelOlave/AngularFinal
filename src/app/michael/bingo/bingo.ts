import { Component, ViewChild, ViewChildren, QueryList, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Board } from '../components/bingo/board/board';
import { MatButtonModule } from '@angular/material/button';
import { BingoSlider } from '../components/bingo/bingo-slider/bingo-slider';
import { CpuBoard } from '../components/bingo/cpu-board/cpu-board';
import { BingoBallSpinner } from '../components/bingo/bingo-ball-spinner/bingo-ball-spinner';
import { GameOutcomePopup } from '../components/game-outcome-popup/game-outcome-popup';

@Component({
  selector: 'app-bingo',
  templateUrl: './bingo.html',
  styleUrls: ['./bingo.css'],
  imports: [
    Board,
    MatButtonModule,
    BingoSlider,
    CpuBoard,
    CommonModule,
    BingoBallSpinner,
    GameOutcomePopup,
  ],
})
export class Bingo implements OnInit {
  readonly Board = Board;
  @ViewChild('boardComp', { read: Board })
  boardComp?: Board;
  @ViewChildren('cpuBoardRefs') cpuBoards?: QueryList<CpuBoard>;
  @ViewChild('bingoSpinner') bingoSpinner!: BingoBallSpinner;
  showMobileCPUBoards = signal(false);
  cpuBoardNames = [
    'Alice',
    'Bob',
    'Charlie',
    'Diana',
    'Ethan',
    'Fiona',
    'George',
    'Hannah',
    'Isaac',
    'Julia',
    'Kevin',
    'Luna',
    'Marcus',
    'Nina',
    'Oliver',
    'Penny',
    'Quinn',
    'Rachel',
    'Samuel',
    'Tara',
    'Ulysses',
    'Violet',
    'Walter',
    'Xena',
    'Yara',
    'Zane',
    'Aria',
    'Blake',
    'Chloe',
    'Derek',
    'Emma',
    'Felix',
    'Grace',
    'Henry',
    'Iris',
    'Jack',
    'Kira',
    'Liam',
    'Maya',
    'Noah',
    'Olivia',
    'Parker',
    'Quinn',
    'Ruby',
    'Sophia',
    'Thomas',
    'Uma',
    'Victor',
    'Wendy',
    'Zara',
  ];
  intervalBetweenRolls = signal(10);
  startBtn: HTMLElement | null = null;
  resetBtn: HTMLElement | null = null;
  rebuildBtn: HTMLElement | null = null;
  numberOfCPUBoardsSlider: HTMLElement | null = null;
  intervalBetweenRollsSlider: HTMLElement | null = null;

  numberOfCPUBoards = 2;
  cpuBoardList: number[] = [];

  initializeBoardList(): void {
    this.cpuBoardList = Array.from({ length: this.numberOfCPUBoards }, (_, i) => i);
  }

  ngOnInit(): void {
    this.initializeBoardList();
    this.startBtn = document.getElementById('startGame');
    this.resetBtn = document.getElementById('resetPlayerBoard');
    this.rebuildBtn = document.getElementById('rebuildCPUBoards');
    this.numberOfCPUBoardsSlider = document.getElementById('number-of-cpus');
    this.intervalBetweenRollsSlider = document.getElementById('interval-between-rolls');
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

    this.startBtn?.setAttribute('disabled', 'true');
    this.resetBtn?.setAttribute('disabled', 'true');
    this.rebuildBtn?.setAttribute('disabled', 'true');
    this.numberOfCPUBoardsSlider?.setAttribute('disabled', 'true');
    this.intervalBetweenRollsSlider?.setAttribute('disabled', 'true');

    Board.gameRunning = true;

    this.bingoSpinner.open();

    this.intervalId = setInterval(() => {
      // Stop loop if gameRunning becomes false
      if (!Board.gameRunning) {
        this.endGame();
        return;
      }

      this.bingoSpinner.open(); // roll a new ball
    }, this.intervalBetweenRolls() * 1000);
  }

  endGame(): void {
    clearInterval(this.intervalId);
    this.intervalId = null;
    console.log('Game ended.');
    this.startBtn?.removeAttribute('disabled');
    this.resetBtn?.removeAttribute('disabled');
    this.rebuildBtn?.removeAttribute('disabled');
    this.numberOfCPUBoardsSlider?.removeAttribute('disabled');
    this.intervalBetweenRollsSlider?.removeAttribute('disabled');
  }

  onBallRolled(rolledNumber: number): void {
    queueMicrotask(() => {
      this.cpuBoards?.forEach((board) => board.checkForNumber(rolledNumber));
    });
  }

  toggleMobileCPUBoards(): void {
    this.showMobileCPUBoards.update(val => !val);
  }
}
