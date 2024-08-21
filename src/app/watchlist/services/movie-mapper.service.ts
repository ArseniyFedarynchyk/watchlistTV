import { Injectable } from '@angular/core';
import { ServerResponse } from '../models/server-response.model';
import { MovieAPI } from '../models/movie-api.model';
import { Movie } from '../models/movie.model';
import { MovieResponse } from '../models/movie-response';

@Injectable({
  providedIn: 'root',
})
export class MovieMapperService {
  mapMovies(movies: MovieAPI[]): Movie[] {
    return movies?.map((movie) => this.mapMovie(movie));
  }

  mapMovie(movie: MovieAPI) {
    return {
      title: movie.Title,
      type: movie.Type,
      year: movie.Year,
      imdbID: movie.imdbID,
      poster: movie.Poster,
      id: movie.id,
    };
  }

  mapMovieToAPIModel(movie: MovieResponse): {
    Poster: string;
    Title: string;
    Type: string;
    Year: string;
    imdbID: string;
  } {
    const movieMapped = {
      Poster: movie.poster,
      Title: movie.title,
      Type: movie.type,
      Year: movie.year,
      imdbID: movie.imdbID,
    };
    return movieMapped;
  }
}
