import { Component, output } from '@angular/core';
import { range } from 'rxjs';

@Component({
  selector: 'app-bingo-ball-spinner',
  imports: [],
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

  spin(): void {
    const ranNum = Math.floor(Math.random() * (this.cagedBalls.length - 0 + 1) + 0);
    const rolledBall = this.cagedBalls[ranNum];
    this.validBalls.push(rolledBall);
    this.cagedBalls.splice(ranNum, 1);
    this.selectedBall.emit(rolledBall);
  }
}
