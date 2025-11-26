import { Component, ViewChild } from '@angular/core';
import { Player } from '../utils/types';
import { GameOutcomePopup } from '../components/game-outcome-popup/game-outcome-popup';

@Component({
  selector: 'app-tic-tac-toe',
  imports: [GameOutcomePopup],
  templateUrl: './tic-tac-toe.html',
  styleUrl: './tic-tac-toe.css',
})
export class TicTacToe {
  readonly Player = Player;
  boardSize = 3;
  currentPlayer: Player = Player.PLAYERONE;
  boardState: [boolean, Player][][] = [];
  playerSymbols = {
    [Player.NONE]: '',
    [Player.PLAYERONE]: 'X',
    [Player.PLAYERTWO]: 'O',
  };
  playerScores: { [key in Player]: number } = {
    [Player.NONE]: 0,
    [Player.PLAYERONE]: 0,
    [Player.PLAYERTWO]: 0,
  };
  @ViewChild('outcomePopup') outcomePopup!: GameOutcomePopup;

  swapPlayerSymbols() {
    const temp = this.playerSymbols[Player.PLAYERONE];
    this.playerSymbols[Player.PLAYERONE] = this.playerSymbols[Player.PLAYERTWO];
    this.playerSymbols[Player.PLAYERTWO] = temp;
  }

  ngOnInit(): void {
    this.initializeBoard();
    this.playerScores[Player.PLAYERONE] = localStorage.getItem('playerOneScore')
      ? parseInt(localStorage.getItem('playerOneScore')!, 10)
      : 0;
    this.playerScores[Player.PLAYERTWO] = localStorage.getItem('playerTwoScore')
      ? parseInt(localStorage.getItem('playerTwoScore')!, 10)
      : 0;
  }

  addPointToPlayer(player: Player): void {
    if (player === Player.PLAYERONE) {
      localStorage.setItem('playerOneScore', this.playerScores[player].toString());
    } else if (player === Player.PLAYERTWO) {
      localStorage.setItem('playerTwoScore', this.playerScores[player].toString());
    }
  }

  // Initializes the Tic-Tac-Toe board to an empty state.
  initializeBoard(): void {
    for (let r = 0; r < this.boardSize; r++) {
      this.boardState[r] = [];
      for (let c = 0; c < this.boardSize; c++) {
        this.boardState[r][c] = [false, Player.NONE];
      }
    }
  }

  resetGame() {
    this.initializeBoard();
    this.currentPlayer = Player.PLAYERONE;
  }

  onCellPlayed(index: [number, number], player: Player) {
    const [row, col] = index;
    if (this.boardState[row][col][0]) return;

    this.boardState[row][col] = [true, player];

    // Check for win condition
    if (this.winCondition(player)) {
      this.playerScores[player]++;
      this.addPointToPlayer(player);
      this.outcomePopup.show(`Player ${this.playerSymbols[player]} Wins!`, 'Congratulations!');
      this.resetGame();
      return;
    }

    // Check for draw condition
    if (this.boardState.every((row) => row.every((cell) => cell[0]))) {
      this.outcomePopup.show("It's a Draw!", 'No points awarded.');
      this.resetGame();
      return;
    }

    // Switch players
    this.currentPlayer =
      this.currentPlayer === Player.PLAYERONE ? Player.PLAYERTWO : Player.PLAYERONE;
  }

  winCondition(player: Player): boolean {
    const board = this.boardState.map((row) => row.map((tile) => tile[1]));

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
}
