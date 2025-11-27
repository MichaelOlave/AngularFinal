import { Component, OnInit, signal } from '@angular/core';
import { loadJSON } from '../../utils/load-json';
import { NgClass } from '@angular/common';

interface TimelineEvent {
  year: string;
  title: string;
  desc: string;
}

@Component({
  selector: 'app-timeline',
  imports: [NgClass],
  templateUrl: './timeline.html',
  styleUrl: './timeline.css',
})
export class Timeline implements OnInit {
  timeline = signal<TimelineEvent[]>([]);

  ngOnInit() {
    loadJSON<TimelineEvent[]>('timeline.json').then((data) => {
      this.timeline.set(data);
    });
  }
}
