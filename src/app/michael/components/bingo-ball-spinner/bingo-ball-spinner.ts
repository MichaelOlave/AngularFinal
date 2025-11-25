import { Component, output } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-bingo-ball-spinner',
  imports: [MatButtonModule, CommonModule],
  templateUrl: './bingo-ball-spinner.html',
  styleUrl: './bingo-ball-spinner.css',
})
export class BingoBallSpinner {
  range = (start: number, end: number): number[] => {
    const length = end - start + 1;
    return Array.from({ length }, (_, i) => start + i);
  };
  cagedBalls: number[] = this.range(1, 75);
  validBalls: number[] = [];
  selectedBall = output<number>();
  selectedBallDisplay: number | null = null;

  spin(): void {
    if (this.cagedBalls.length === 0) return;
    const ranNum = Math.floor(Math.random() * this.cagedBalls.length);
    const rolledBall = this.cagedBalls[ranNum];
    this.validBalls.push(rolledBall);
    this.cagedBalls.splice(ranNum, 1);
    this.selectedBall.emit(rolledBall);
    this.selectedBallDisplay = rolledBall;
  }
}
