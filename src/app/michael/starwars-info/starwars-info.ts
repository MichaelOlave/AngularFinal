import { ChangeDetectorRef, Component } from '@angular/core';
import { starwarsFilmAPI } from '../api/starwars/starwars';
import { Film, FilmCard } from '../components/starwars/film-card/film-card';
import { Footer } from '../../components/footer/footer';

@Component({
  selector: 'app-starwars-info',
  imports: [FilmCard, Footer],
  standalone: true,
  templateUrl: './starwars-info.html',
  styleUrls: ['./starwars-info.css'],
})
export class StarwarsInfo {
  films: Film[] = [];

  constructor(private cdRef: ChangeDetectorRef) {}

  async fetchFilms() {
    this.films = await starwarsFilmAPI.getFilms();
    this.cdRef.detectChanges();
  }
}
