import { Film } from '../../components/film-card/film-card';

export const starwarsFilmAPI: { getFilms: () => Promise<Film[]> } = {
  getFilms: async () => {
    const res = await fetch(`https://swapi.dev/api/films`);
    const data = await res.json();
    return data.results;
  },
};
