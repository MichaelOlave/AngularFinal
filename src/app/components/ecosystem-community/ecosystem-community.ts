import { Component, OnInit, signal } from '@angular/core';
import { loadJSON } from '../../utils/load-json';

interface EcosystemItem {
  name: string;
  description: string;
}

@Component({
  selector: 'app-ecosystem-community',
  imports: [],
  templateUrl: './ecosystem-community.html',
  styleUrl: './ecosystem-community.css',
})
export class EcosystemCommunity implements OnInit {
  ecosystemItems = signal<EcosystemItem[]>([]);

  ngOnInit(): void {
    loadJSON<EcosystemItem[]>('tools.json').then((data) => {
      this.ecosystemItems.set(data);
    });
  }
}
