import { Component, OnInit, signal } from '@angular/core';
import { loadJSON } from '../../utils/load-json';

interface Feature {
  title: string;
  desc: string;
  icon: string;
  category: 'core' | 'performance' | 'ecosystem';
}

@Component({
  selector: 'app-core-concepts',
  imports: [],
  templateUrl: './core-concepts.html',
  styleUrl: './core-concepts.css',
})
export class CoreConcepts implements OnInit {
  concepts = signal<Feature[]>([]);
  ngOnInit(): void {
    loadJSON<Feature[]>('core-concepts.json').then((data) => {
      this.concepts.set(data);
    });
  }
}
