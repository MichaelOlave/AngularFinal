import { Component, OnInit } from '@angular/core';
import { loadJSON } from '../../utils/load-json';

interface TimelineEvent {
  year: string;
  title: string;
  desc: string;
}

@Component({
  selector: 'app-timeline',
  imports: [],
  templateUrl: './timeline.html',
  styleUrl: './timeline.css',
})
export class Timeline implements OnInit {
  timeline: TimelineEvent[] = [];
  ngOnInit() {
    loadJSON<TimelineEvent[]>('timeline.json').then((data) => {
      console.log('Timeline data loaded:', data);
      this.timeline = data;
    });
  }
}
