import { Component, OnInit, signal } from '@angular/core';
import { loadJSON } from '../../utils/load-json';

interface FuturePoint {
  id: number;
  point: string;
  description: string;
}

@Component({
  selector: 'app-future',
  imports: [],
  templateUrl: './future.html',
  styleUrl: './future.css',
})
export class Future implements OnInit {
  futurePoints = signal<FuturePoint[]>([]);
  ngOnInit() {
    loadJSON<FuturePoint[]>('future.json').then((data) => {
      this.futurePoints.set(data);
    });
  }
}
