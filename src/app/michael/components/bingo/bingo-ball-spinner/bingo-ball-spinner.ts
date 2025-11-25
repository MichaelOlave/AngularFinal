import { Component, output, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BingoService } from '../../../utils/bingoService';

@Component({
  selector: 'app-bingo-ball-spinner',
  imports: [CommonModule],
  templateUrl: './bingo-ball-spinner.html',
  styleUrl: './bingo-ball-spinner.css',
})
export class BingoBallSpinner {
  constructor(private bingo: BingoService) {}

  visible = signal(false);
  number = signal(0);
  isSpinning = signal(false);
  private rollingInterval: any;

  rolled = output<number>();

  open() {
    this.visible.set(true);
    this.isSpinning.set(true);
    this.startRolling();

    setTimeout(() => {
      const finalBall = this.bingo.spin();
      clearInterval(this.rollingInterval);
      this.isSpinning.set(false);
      this.number.set(finalBall);
    }, 2000);

    setTimeout(() => {
      this.rolled.emit(this.number());
    }, 2500);

    setTimeout(() => {
      this.close();
    }, 5000);
  }

  close() {
    this.visible.set(false);
    this.isSpinning.set(false);
    clearInterval(this.rollingInterval);
  }

  private startRolling() {
    clearInterval(this.rollingInterval);
    this.rollingInterval = setInterval(() => {
      this.number.set(Math.floor(Math.random() * 75) + 1);
    }, 60);
  }
}
