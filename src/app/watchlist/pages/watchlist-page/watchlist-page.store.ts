import { Injectable, signal } from '@angular/core';
import { Movie } from '../../models/movie.model';
import { ComponentStore } from '@ngrx/component-store';
import { exhaustMap, map, mergeMap, Observable, tap } from 'rxjs';
import { WatchListService } from '../../services/watchlist.service';
import { MovieMapperService } from '../../services/movie-mapper.service';
import { MovieResponse } from '../../models/movie-response';

export interface MoviesState {
  movies: Movie[];
}

@Injectable()
export class WatchlistPageStore extends ComponentStore<MoviesState> {
  private readonly shows$ = this.select((state) => state.movies);
  private readonly movies$ = this.select((state) =>
    state.movies.filter((show) => show.type === 'movie')
  );
  private readonly series$ = this.select((state) =>
    state.movies.filter((show) => show.type === 'series')
  );
  readonly vm$ = this.select({
    shows: this.shows$,
    movies: this.movies$,
    series: this.series$,
  });
  readonly signal = signal<string>('all');

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
          tap((movies) => this.patchState({ movies: movies }))
        );
      })
    );
  });

  postMovie = this.effect((trigger$: Observable<MovieResponse>) => {
    return trigger$.pipe(
      mergeMap((newMovie) => {
        return this.watchlistService.postMovies(newMovie);
      })
    );
  });

  removeMovie = this.effect((trigger$: Observable<string>) => {
    return trigger$.pipe(
      exhaustMap((movieId) => {
        return this.watchlistService.removeMovie(movieId);
      })
    );
  });

  addMovie = this.updater((state, newMovie: Movie) => ({
    movies: [...state.movies, newMovie],
  }));

  switchShows(value: string) {
    this.signal.set(value);
  }
}
