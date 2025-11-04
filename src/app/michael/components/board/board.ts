import { Component, input } from '@angular/core';

@Component({
  selector: 'app-board',
  imports: [],
  templateUrl: './board.html',
  styleUrl: './board.css',
})
export class Board {
  fontSize = input(24);
  tileSize = input(100);
  boardSize = input(5);
  board: HTMLElement[][] = [];
  boardConfig: { column: string; range: [number, number]; freeSpace: boolean }[] = [
    { column: 'B', range: [1, 15], freeSpace: false },
    { column: 'I', range: [16, 30], freeSpace: false },
    { column: 'N', range: [31, 45], freeSpace: true },
    { column: 'G', range: [46, 60], freeSpace: false },
    { column: 'O', range: [61, 75], freeSpace: false },
  ];
  // TODO Allow for adding columns
  addColumn() {}
  // TODO Allow for removing columns
  removeColumn() {}
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
  tile(value: number): HTMLElement {
    const gridTile = document.createElement('div');
    gridTile.style.width = `${this.tileSize()}px`;
    gridTile.style.height = `${this.tileSize()}px`;
    gridTile.style.border = 'solid';
    gridTile.style.backgroundColor = 'gray';
    gridTile.onmouseenter = () => {
      if (gridTile.style.backgroundColor !== 'red') {
        gridTile.style.backgroundColor = 'lightgray';
      }
    };
    gridTile.onmouseleave = () => {
      if (gridTile.style.backgroundColor !== 'red') {
        gridTile.style.backgroundColor = 'gray';
      }
    };
    gridTile.style.cursor = 'pointer';
    gridTile.style.fontSize = `${this.fontSize()}px`;
    gridTile.style.alignContent = 'center';
    gridTile.style.textAlign = 'center';
    gridTile.textContent = String(value);
    if (value === 0) {
      gridTile.textContent = 'FREE';
    }
    gridTile.onclick = () => {
      gridTile.style.backgroundColor = gridTile.style.backgroundColor === 'red' ? 'gray' : 'red';
    };
    return gridTile;
  }
  headerTile(value: string): HTMLElement {
    const headerTile = document.createElement('div');
    headerTile.style.width = `${this.tileSize()}px`;
    headerTile.style.height = `${this.tileSize()}px`;
    headerTile.style.backgroundColor = 'white';
    headerTile.style.fontSize = `${this.fontSize() + 25}px`;
    headerTile.style.alignContent = 'center';
    headerTile.style.textAlign = 'center';
    headerTile.textContent = value;
    return headerTile;
  }
  tileColumn(boardConfig: {
    column: string;
    range: [number, number];
    freeSpace: boolean;
  }): HTMLElement {
    const col = document.createElement('div');
    col.style.display = 'flex';
    col.style.flexDirection = 'column';

    col.appendChild(this.headerTile(boardConfig.column));

    const values = this.generateValues(boardConfig.range);

    const size = this.boardSize();

    if (boardConfig.freeSpace) {
      values[Math.ceil(size / 2 - 1)] = 0;
    }

    for (let i = 0; i < size; i++) {
      col.appendChild(this.tile(values[i]));
    }
    return col;
  }
  loadBoard(parentElem: string): void {
    const gameBoard = document.getElementById(parentElem);
    if (!gameBoard) return;
    gameBoard.style.display = 'flex';
    gameBoard.style.justifyContent = 'center';

    this.boardConfig.forEach((col) => {
      gameBoard.appendChild(this.tileColumn(col));
    });
  }
}
