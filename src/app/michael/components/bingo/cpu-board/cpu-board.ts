import { Component } from '@angular/core';
import { Board } from '../board/board';
import { ToastService } from '../../../utils/toastService';

@Component({
  selector: 'app-cpu-board',
  imports: [],
  templateUrl: './cpu-board.html',
  styleUrl: './cpu-board.css',
})
export class CpuBoard extends Board {
  constructor(toastService: ToastService) {
    super(toastService);
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
      Board.gameRunning = false;
    }
  }
}
