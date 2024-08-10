import { Injectable } from '@angular/core';
import { Movie } from '../../models/movie.model';
import { ComponentStore } from '@ngrx/component-store';
import { exhaustMap, map, mergeMap, Observable, tap } from 'rxjs';
import { WatchListService } from '../../services/watchlist.service';
import { MovieMapperService } from '../../services/movie-mapper.service';

export interface MoviesState {
  movies: Movie[];
}

@Injectable()
export class WatchlistPageStore extends ComponentStore<MoviesState> {
  readonly movies$ = this.select((state) => state.movies);

  constructor(
    private readonly watchlistService: WatchListService,
    private readonly movieMapperService: MovieMapperService
  ) {
    super({ movies: [] });
  }

  getMovies = this.effect((trigger$) => {
    return trigger$.pipe(
      exhaustMap(() => {
        return this.watchlistService.getMovies().pipe(
          map((movies) => this.movieMapperService.mapMovies(movies)),
          tap((movies) => {
            this.patchState({ movies: movies });
          })
        );
      })
    );
  });

  postMovie = this.effect((trigger$: Observable<Movie>) => {
    return trigger$.pipe(
      mergeMap((value) => {
        return this.watchlistService.postMovies(value);
      })
    );
  });

  addMovie = this.updater((state, newMovie: Movie) => ({
    movies: [...state.movies, newMovie],
  }));
}
