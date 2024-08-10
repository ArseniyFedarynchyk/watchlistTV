import { Injectable } from '@angular/core';
import { ServerResponse } from '../models/server-response.model';
import { MovieAPI } from '../models/movie-api.model';
import { Movie } from '../models/movie.model';

@Injectable({
  providedIn: 'root',
})
export class MovieMapperService {
  mapMovies(response: ServerResponse): Movie[] {
    return response.Search?.map((movie) => this.mapMovie(movie));
  }

  mapMovies2(movies: MovieAPI[]): Movie[] {
    return movies.map((movie) => this.mapMovie(movie));
  }

  mapMovie(movie: MovieAPI) {
    return {
      title: movie.Title,
      type: movie.Type,
      year: movie.Year,
      imdbID: movie.imdbID,
      poster: movie.Poster,
    };
  }

  mapMovieToAPIModel(movie: Movie): MovieAPI {
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
