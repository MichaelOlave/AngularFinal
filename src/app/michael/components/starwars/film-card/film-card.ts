import { Component, Input } from '@angular/core';

export interface Film {
  title: string;
  episode_id: number;
  opening_crawl: string;
  director: string;
  producer: string;
  release_date: string;
  characters: string[];
  planets: string[];
  starships: string[];
  vehicles: string[];
  species: string[];
  created: string;
  edited: string;
  url: string;
}

@Component({
  selector: 'app-film-card',
  imports: [],
  standalone: true,
  templateUrl: './film-card.html',
  styleUrl: './film-card.css',
})
export class FilmCard {
  @Input() film!: Film;
  constructor() {
    console.log(this.film);
  }
}
