import { Component, OnDestroy, NgZone } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BehaviorSubject, interval, NEVER } from 'rxjs';
import { map, startWith, switchMap } from 'rxjs/operators';

const wordList = ["series", "ban", "fuss", "exaggerate", "flawed", "wait", "lot", "denial", "flourish", "skate", "clear", "commerce", "rubbish", "manufacture", "bride", "smile", "fraction", "alive", "crisis", "unlikely", "gain", "offer", "foot", "wedding", "office", "national", "convict", "fresh", "disaster", "cucumber", "include", "joystick", "aluminium", "message", "compensation", "ton", "voucher", "update", "diet", "accountant", "ready", "grow", "helpless", "rank", "bland", "makeup", "bean", "exclusive", "conclusion"]

interface Characters {
  index: number;
  char: string;
  state: 'correct' | 'incorrect' | 'untyped';
}

interface Word {
  letters: Characters[];
}


@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css',
})
export class Dashboard implements OnDestroy {

  count = 20;
  // selectedCharacters: Characters[] = [];
  selectedWords : Word[] = [];
  currentIndex: number = 0;
  inputFocused: boolean = false;

  startTime = Date.now();
  timer = 0;
  finalTime = 0;

  // timer$ will emit elapsed milliseconds while the game is running
  private running$ = new BehaviorSubject<boolean>(false);

  timer$ = this.running$.pipe(
    switchMap((running) =>
      running
        ? interval(100).pipe(startWith(0), map(() => (Date.now() - this.startTime)/1000))
        : NEVER
    )
  );

  intervalId: any;

  wordsTyped: number = 0;
  errorsMade: number = 0;


  private start() {
    // set start time then enable the timer observable
    this.startTime = Date.now();
    this.running$.next(true);
  }

  private end() {
    // disable the timer observable
    this.finalTime = Date.now() - this.startTime;

    this.running$.next(false);
  }

  generateWords() {
    this.ngZone.runOutsideAngular(() => {
      let words = [];
      for (let i = 0; i < this.count; i++) {
        if (i > 0) {
          words.push([' ']);
        }

        const randomIndex = Math.floor(Math.random() * wordList.length);
        words.push(wordList[randomIndex].split(''));
      }

      let i = 0;
      this.selectedWords = words.map(wordArray => {
        const letters: Characters[] = wordArray.map((char) => ({
          index: i++,
          char: char,
          state: 'untyped' as 'untyped'
        }));
        return { letters };
      });


    }); 
  }

  private countErrors() {
    let errors = 0;
    this.selectedWords.forEach(word => {
      word.letters.forEach(charObj => {
        if (charObj.state === 'incorrect') {
          errors++;
        }
      });
    });
    this.errorsMade = errors;
  }

  private countWordsTyped() {
    
    let wordsTyped = 0;
    this.selectedWords.forEach(word => {
      const allTyped = word.letters.every(charObj => charObj.state !== 'untyped');
      if (word.letters.length === 1 && word.letters[0].char === ' ') {
        return; // skip counting spaces as words
      }

      if (allTyped) {
        wordsTyped++;
      }
    });
    this.wordsTyped = wordsTyped;
  }


  handleKeyPress(event: KeyboardEvent) {
    event.preventDefault()

    const key = event.key;

    if (!this.running$.getValue() && !this.finalTime) {
      this.start();
    }

    // Flatten all letters from selectedWords into a single array for indexing
    const allCharacters = this.selectedWords.flatMap(word => word.letters);

    if (this.currentIndex >= allCharacters.length) {
      return;
    }
    
    const currentCharObj = allCharacters[this.currentIndex];
    if (key.length === 1) { // Only process single character keys
      if (key === currentCharObj.char) {
        currentCharObj.state = 'correct';
      } else {
        currentCharObj.state = 'incorrect';
      }
      this.currentIndex++;
    } else if (key === 'Backspace') {
      if (this.currentIndex > 0) {
        this.currentIndex--;
        allCharacters[this.currentIndex].state = 'untyped';
      }
    }

    if (this.currentIndex >= allCharacters.length) {
      this.end();
    }

    this.countErrors();
    this.countWordsTyped();
  }


  constructor(private ngZone: NgZone) {
    this.generateWords();
  }

  onFocus() {
    this.inputFocused = true;
  }

  onBlur() {
    this.inputFocused = false;
  }

  ngOnDestroy(): void {
    if (this.intervalId) {
      clearInterval(this.intervalId);
    }
  }
}
