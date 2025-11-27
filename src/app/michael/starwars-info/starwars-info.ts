import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { starwarsFilmAPI } from '../api/starwars/starwars';
import { Film, FilmCard } from '../components/starwars/film-card/film-card';

@Component({
  selector: 'app-starwars-info',
  imports: [FilmCard],
  standalone: true,
  templateUrl: './starwars-info.html',
  styleUrls: ['./starwars-info.css'],
})
export class StarwarsInfo implements OnInit {
  films: Film[] = [];

  constructor(private cdRef: ChangeDetectorRef) {}

  async ngOnInit() {
    this.films = await starwarsFilmAPI.getFilms();
    this.cdRef.detectChanges();
  }
}
