import { Injectable } from '@angular/core';
import { MovieAPI } from '../models/movie-api.model';
import { Movie } from '../models/movie.model';

@Injectable({
  providedIn: 'root',
})
export class MovieMapperService {
  mapMovies(movies: MovieAPI[]): Movie[] {
    return movies?.map((movie) => this.mapMovie(movie));
  }

  mapMovie(movie: MovieAPI): Movie {
    return {
      title: movie.Title,
      type: movie.Type,
      year: movie.Year,
      imdbID: movie.imdbID,
      poster: movie.Poster,
      id: movie.id,
    };
  }
}
