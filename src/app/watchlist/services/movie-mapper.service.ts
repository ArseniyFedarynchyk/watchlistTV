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

  mapMovie(movie: MovieAPI) {
    return {
      title: movie.Title,
      type: movie.Type,
      year: movie.Year,
      imbdID: movie.imbdID,
      poster: movie.Poster,
    };
  }
}
