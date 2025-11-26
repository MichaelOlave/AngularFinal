import { Component, input, output, ViewEncapsulation } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BoardConfig } from '../../../utils/types';
import { ToastService } from '../../../utils/toastService';

@Component({
  selector: 'app-board',
  imports: [CommonModule],
  templateUrl: './board.html',
  styleUrl: './board.css',
  encapsulation: ViewEncapsulation.None,
})
export class Board {
  static gameRunning = false;
  boardState: [number, boolean][][] = [];
  togglingDisabled = false;
  boardConfig = input<BoardConfig>({
    boardSize: 5,
    columns: [
      { column: 'B', range: [1, 15], freeSpace: false },
      { column: 'I', range: [16, 30], freeSpace: false },
      { column: 'N', range: [31, 45], freeSpace: true },
      { column: 'G', range: [46, 60], freeSpace: false },
      { column: 'O', range: [61, 75], freeSpace: false },
    ],
  });
  winDetected = output<void>();

  constructor(protected toastService: ToastService) {}

  // Generates a list of unique numbers in a specified range.
  generateValues(range: [number, number] = [1, 15]): number[] {
    const tileNumbers: number[] = [];
    const size = this.boardConfig().boardSize;
    for (let i = 0; i < size; i++) {
      const ranNum = Math.floor(Math.random() * (range[1] - range[0] + 1) + range[0]);
      if (tileNumbers.includes(ranNum)) {
        i--;
        continue;
      }
      tileNumbers.push(ranNum);
    }
    return tileNumbers;
  }

  ngOnInit(): void {
    this.initializeBoard();
  }

  initializeBoard(): void {
    const size = this.boardConfig().boardSize;
    // Initialize board state
    for (let r = 0; r < size; r++) {
      this.boardState[r] = [];
      for (let c = 0; c < size; c++) {
        this.boardState[r][c] = [0, false];
      }
    }
    // Populate board with numbers
    for (let c = 0; c < size; c++) {
      const tileNumbers = this.generateValues(this.boardConfig().columns[c].range);
      for (let r = 0; r < size; r++) {
        this.boardState[r][c][0] = tileNumbers[r];
        if (this.boardConfig().columns[c].freeSpace && r === Math.floor(size / 2)) {
          this.boardState[r][c][1] = true;
          this.boardState[r][c][0] = 0;
        }
      }
    }
  }

  toggleTile(row: number, col: number): void {
    if (this.togglingDisabled) return;
    this.boardState[row][col][1] = !this.boardState[row][col][1];
    if (this.checkWin()) {
      this.toastService.showToast('Bingo!', 'win', 10000);
      this.winDetected.emit();
      this.togglingDisabled = true;
      Board.gameRunning = false;
    }
  }

  resetBoard(): void {
    this.togglingDisabled = false;
    this.initializeBoard();
    console.log('Board reset');
  }

  checkWin(): boolean {
    const rows = this.boardConfig().boardSize;
    const cols = this.boardConfig().columns.length;
    // rows
    for (let r = 0; r < rows; r++) {
      let all = true;
      for (let c = 0; c < cols; c++) {
        if (!this.boardState[r][c][1]) {
          all = false;
          break;
        }
      }
      if (all) return true;
    }
    // columns
    for (let c = 0; c < cols; c++) {
      let all = true;
      for (let r = 0; r < rows; r++) {
        if (!this.boardState[r][c][1]) {
          all = false;
          break;
        }
      }
      if (all) return true;
    }
    // diagonals
    if (rows === cols) {
      let allMain = true;
      let allAnti = true;
      for (let i = 0; i < rows; i++) {
        if (!this.boardState[i][i][1]) allMain = false;
        if (!this.boardState[i][rows - 1 - i][1]) allAnti = false;
        if (!allMain && !allAnti) break;
      }
      if (allMain || allAnti) return true;
    }
    return false;
  }
}
