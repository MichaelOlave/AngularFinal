import { Component, Input, output, signal } from '@angular/core';
import { Board } from '../board/board';
import { ToastService } from '../../../utils/toastService';

@Component({
  selector: 'app-cpu-board',
  imports: [],
  templateUrl: './cpu-board.html',
  styleUrl: './cpu-board.css',
})
export class CpuBoard extends Board {
  @Input() name = 'CPU';
  cpuWin = output<string>();
  isRevealed = signal(false);

  constructor(toastService: ToastService) {
    super(toastService);
  }

  toggleReveal(): void {
    this.isRevealed.update(val => !val);
  }

  checkForNumber(number: number): void {
    this.boardState.forEach((row, rowIndex) => {
      row.forEach((value, colIndex) => {
        if (value[0] === number) {
          this.boardState[rowIndex][colIndex][1] = true;
        }
      });
    });
    if (this.checkWin()) {
      this.toastService.showToast('CPU Bingo! The CPU has won the game!', 'lose');
      this.cpuWin.emit(this.name);
      Board.gameRunning = false;
    }
  }
}
