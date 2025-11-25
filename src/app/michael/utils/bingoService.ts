import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class BingoService {
  range = (start: number, end: number): number[] => {
    const length = end - start + 1;
    return Array.from({ length }, (_, i) => start + i);
  };
  cagedBalls: number[] = this.range(1, 75);
  validBalls: number[] = [];

  spin(): number {
    if (this.cagedBalls.length === 0) return -1;
    const ranNum = Math.floor(Math.random() * this.cagedBalls.length);
    const rolledBall = this.cagedBalls[ranNum];
    this.validBalls.push(rolledBall);
    this.cagedBalls.splice(ranNum, 1);
    return rolledBall;
  }

  resetSpinner(): void {
    this.cagedBalls = this.range(1, 75);
    this.validBalls = [];
  }
}
