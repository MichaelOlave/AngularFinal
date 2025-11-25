import { Component, input, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-board',
  imports: [],
  templateUrl: './board.html',
  styleUrl: './board.css',
  encapsulation: ViewEncapsulation.None,
})
export class Board {
  fontSize = input(24);
  tileSize = input(100);
  boardSize = input(5);
  boardState: boolean[][] = [];
  boardConfig: { column: string; range: [number, number]; freeSpace: boolean }[] = [
    { column: 'B', range: [1, 15], freeSpace: false },
    { column: 'I', range: [16, 30], freeSpace: false },
    { column: 'N', range: [31, 45], freeSpace: true },
    { column: 'G', range: [46, 60], freeSpace: false },
    { column: 'O', range: [61, 75], freeSpace: false },
  ];

  // Generates a list of unique numbers in a specified range.
  generateValues(range: [number, number] = [1, 15]): number[] {
    const tileNumbers: number[] = [];
    const size = this.boardSize();
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

  tile(value: number, row: number, col: number): HTMLElement {
    const gridTile = document.createElement('div');
    gridTile.classList.add('bingo-tile');
    gridTile.style.width = `${this.tileSize()}px`;
    gridTile.style.height = `${this.tileSize()}px`;
    gridTile.style.fontSize = `${this.fontSize()}px`;
    gridTile.textContent = String(value);

    // Setting Free space Text
    if (value === 0) {
      gridTile.textContent = 'FREE';
    }

    // Change color when Clicked
    gridTile.onclick = () => {
      gridTile.classList.toggle('bingo-tile-clicked');
      this.boardState[row][col] = !this.boardState[row][col];
      if (this.checkWin()) {
        alert('You Have Wone!!');
      }
    };

    return gridTile;
  }

  headerTile(value: string): HTMLElement {
    const headerTile = document.createElement('div');
    headerTile.classList.add('bingo-header-tile');
    headerTile.style.width = `${this.tileSize()}px`;
    headerTile.style.height = `${this.tileSize()}px`;
    headerTile.style.fontSize = `${this.fontSize() + 25}px`;
    headerTile.textContent = value;

    return headerTile;
  }

  tileColumn(
    colIndex: number,
    boardConfig: {
      column: string;
      range: [number, number];
      freeSpace: boolean;
    }
  ): HTMLElement {
    const col = document.createElement('div');
    col.classList.add('tile-column');

    // Add header tile
    col.appendChild(this.headerTile(boardConfig.column));

    // Create Array of numbers
    const values = this.generateValues(boardConfig.range);

    const size = this.boardSize();

    if (boardConfig.freeSpace) {
      values[Math.ceil(size / 2 - 1)] = 0;
    }

    // Create Tiles using numbers from the Array
    for (let i = 0; i < size; i++) {
      col.appendChild(this.tile(values[i], i, colIndex));
    }
    return col;
  }

  loadBoard(parentElem: string): void {
    const playSpace = document.getElementById(parentElem);
    if (!playSpace) return;

    const gameBoard = document.createElement('div');
    gameBoard.classList.add('game-board');

    // Auto fills the state Array with false
    this.boardState = Array.from({ length: this.boardSize() }, () =>
      Array.from({ length: this.boardSize() }, () => false)
    );

    // Creates the board
    this.boardConfig.forEach((col, i) => {
      gameBoard.appendChild(this.tileColumn(i, col));
    });

    playSpace.appendChild(gameBoard);
  }

  checkWin(): boolean {
    const rows = this.boardSize();
    const cols = this.boardConfig.length;

    // rows
    for (let r = 0; r < rows; r++) {
      let all = true;
      for (let c = 0; c < cols; c++) {
        if (!this.boardState[r][c]) {
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
        if (!this.boardState[r][c]) {
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
        if (!this.boardState[i][i]) allMain = false;
        if (!this.boardState[i][rows - 1 - i]) allAnti = false;
        if (!allMain && !allAnti) break;
      }
      if (allMain || allAnti) return true;
    }

    return false;
  }
}
