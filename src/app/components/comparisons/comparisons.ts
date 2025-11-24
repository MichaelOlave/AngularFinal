import { Component, OnInit, signal } from '@angular/core';
import { loadJSON } from '../../utils/load-json';

interface Comparison {
  metric: string;
  angular: string;
  others: string;
}

@Component({
  selector: 'app-comparisons',
  imports: [],
  templateUrl: './comparisons.html',
  styleUrl: './comparisons.css',
})
export class Comparisons implements OnInit {
  comparisons = signal<Comparison[]>([]);

  ngOnInit() {
    loadJSON<Comparison[]>('comparisons.json').then((data) => {
      this.comparisons.set(data);
    });
  }
}
