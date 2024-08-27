import { Injectable, signal } from '@angular/core';
import { Movie } from '../../models/movie.model';
import { ComponentStore } from '@ngrx/component-store';
import { exhaustMap, mergeMap, Observable, tap } from 'rxjs';
import { WatchListService } from '../../services/watchlist.service';

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

  constructor(private readonly watchlistService: WatchListService) {
    super({ movies: [] });
  }

  getMovies = this.effect((trigger$) => {
    return trigger$.pipe(
      exhaustMap(() => {
        return this.watchlistService
          .getMovies()
          .pipe(tap((movies) => this.patchState({ movies: movies })));
      })
    );
  });

  postMovie = this.effect((trigger$: Observable<Movie>) => {
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
