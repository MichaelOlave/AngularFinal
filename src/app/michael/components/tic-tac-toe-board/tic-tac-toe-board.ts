import { AfterViewInit, Component, ViewEncapsulation } from '@angular/core';

enum Player {
  PLAYERONE,
  PLAYERTWO,
  NONE,
}

class Tile {
  tileElement: HTMLElement;
  playerState: Player;

  constructor(element: HTMLElement = document.createElement('div')) {
    this.tileElement = element;
    this.tileElement.className = 'tile';
    this.playerState = Player.NONE;
  }

  translateState(): void {
    switch (this.playerState) {
      case Player.PLAYERONE:
        this.tileElement.style.backgroundColor = 'blue';
        break;
      case Player.PLAYERTWO:
        this.tileElement.style.backgroundColor = 'red';
        break;
      default:
        this.tileElement.style.backgroundColor = 'cornsilk';
        break;
    }
  }

  get player(): Player {
    return this.playerState;
  }

  set player(currentPlayer: Player) {
    if (currentPlayer === Player.NONE) {
      this.playerState = Player.NONE;
      this.translateState();
      return;
    }
    if (this.playerState === Player.NONE) {
      this.playerState = currentPlayer;
      this.translateState();
    }
  }
}

@Component({
  selector: 'app-tic-tac-toe-board',
  imports: [],
  templateUrl: './tic-tac-toe-board.html',
  styleUrl: './tic-tac-toe-board.css',
  encapsulation: ViewEncapsulation.None,
})
export class TicTacToeBoard implements AfterViewInit {
  boardElement: HTMLElement;
  boardMatrix: Tile[][];
  currentPlayer: Player;
  static playerOneWins: number = 0;
  static playerTwoWins: number = 0;

  ngAfterViewInit(): void {
    this.init();
  }

  constructor() {
    this.boardElement = document.createElement('div');
    this.boardElement.className = 'board';
    this.currentPlayer = Player.PLAYERONE;

    // Initialize 3x3 matrix
    this.boardMatrix = Array.from({ length: 3 }, () => Array.from({ length: 3 }, () => new Tile()));

    this.boardMatrix.forEach((row) =>
      row.forEach((tile) => {
        this.boardElement.appendChild(tile.tileElement);
        tile.tileElement.addEventListener('click', () => this.handleClick(tile));
      })
    );
  }

  handleClick(tile: Tile): void {
    if (tile.player !== Player.NONE) return;

    tile.player = this.currentPlayer;

    if (this.winCondition(this.currentPlayer)) {
      alert(`Player ${this.currentPlayer === Player.PLAYERONE ? 'Blue' : 'Red'} wins!`);
      this.addWin(this.currentPlayer);
      this.disableBoard();
      return;
    }

    if (this.drawCondition()) {
      alert('No Body Wins!! Draw!');
      return;
    }

    this.currentPlayer =
      this.currentPlayer === Player.PLAYERONE ? Player.PLAYERTWO : Player.PLAYERONE;
  }

  disableBoard(): void {
    this.boardMatrix.forEach((row) =>
      row.forEach((tile) => {
        tile.tileElement.style.pointerEvents = 'none';
      })
    );
  }

  winCondition(player: Player): boolean {
    const board = this.boardMatrix.map((row) => row.map((tile) => tile.player));

    for (let i = 0; i < 3; i++) {
      if (
        // row
        board[i][0] === player &&
        board[i][1] === player &&
        board[i][2] === player
      )
        return true;
      if (
        // column
        board[0][i] === player &&
        board[1][i] === player &&
        board[2][i] === player
      )
        return true;
    }

    // diagonals
    if (board[0][0] === player && board[1][1] === player && board[2][2] === player) return true;
    if (board[0][2] === player && board[1][1] === player && board[2][0] === player) return true;

    return false;
  }

  drawCondition(): boolean {
    return !this.boardMatrix.some((row) => row.some((tile) => tile.player === Player.NONE));
  }

  selectStartingPlayer(player: Player) {
    this.currentPlayer = player;
  }

  resetBoard(): void {
    this.boardMatrix.forEach((row) =>
      row.forEach((tile) => {
        tile.player = Player.NONE;
        tile.tileElement.style.pointerEvents = 'auto';
      })
    );
    this.currentPlayer = Player.PLAYERONE;
  }

  addWin(player: Player): void {
    if (player === Player.PLAYERONE) {
      TicTacToeBoard.playerOneWins++;
      localStorage.setItem('blueWins', TicTacToeBoard.playerOneWins.toString());
    } else {
      TicTacToeBoard.playerTwoWins++;
      localStorage.setItem('redWins', TicTacToeBoard.playerTwoWins.toString());
    }
    this.updateScore();
  }

  updateScore(): void {
    const score = document.getElementById('score');
    if (score) {
      score.textContent = `Blue Wins: ${TicTacToeBoard.playerOneWins} | Red Wins: ${TicTacToeBoard.playerTwoWins}`;
    }
  }
  init(): void {
    const board = this;

    TicTacToeBoard.playerOneWins = parseInt(localStorage.getItem('blueWins') || '0', 10);
    TicTacToeBoard.playerTwoWins = parseInt(localStorage.getItem('redWins') || '0', 10);

    document.getElementById('play-ground')?.appendChild(board.boardElement);

    const blueBtn = document.createElement('button');
    blueBtn.addEventListener('click', () => {
      board.selectStartingPlayer(Player.PLAYERONE);
      redBtn.hidden = true;
      blueBtn.hidden = true;
    });
    blueBtn.textContent = 'Start As Blue';
    blueBtn.id = 'blue-btn';

    const redBtn = document.createElement('button');
    redBtn.addEventListener('click', () => {
      board.selectStartingPlayer(Player.PLAYERTWO);
      redBtn.hidden = true;
      blueBtn.hidden = true;
    });
    redBtn.textContent = 'Start As Red';
    redBtn.id = 'red-btn';

    const resetBtn = document.createElement('button');
    resetBtn.addEventListener('click', () => {
      board.resetBoard();
      redBtn.hidden = false;
      blueBtn.hidden = false;
    });
    resetBtn.textContent = 'Reset Board';
    resetBtn.id = 'reset';

    const scoreBoard = document.createElement('div');
    scoreBoard.className = 'score-board';
    scoreBoard.id = 'score';
    const footer = document.getElementById('footer');
    const footerAction = document.getElementById('footer-action');

    footerAction?.appendChild(blueBtn);
    footerAction?.appendChild(resetBtn);
    footerAction?.appendChild(redBtn);

    footer?.appendChild(scoreBoard);

    board.updateScore();
  }
}
