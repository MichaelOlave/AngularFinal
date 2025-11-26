import { Component, signal } from '@angular/core';

@Component({
  selector: 'app-game-outcome-popup',
  imports: [],
  templateUrl: './game-outcome-popup.html',
  styleUrl: './game-outcome-popup.css',
})
export class GameOutcomePopup {
  visible = signal(false);
  outcomeTitle = signal('');
  outcomeMessage = signal('');

  show(title: string, message: string) {
    this.outcomeTitle.set(title);
    this.outcomeMessage.set(message);
    this.visible.set(true);
  }

  hide() {
    this.visible.set(false);
  }

  onActionClick() {
    this.hide();
  }
}
