import { Injectable, signal } from '@angular/core';
import { Movie } from '../../models/movie.model';
import { ComponentStore } from '@ngrx/component-store';
import { debounceTime, exhaustMap, map, mergeMap, Observable, tap } from 'rxjs';
import { WatchListService } from '../../services/watchlist.service';
import { MovieMapperService } from '../../services/movie-mapper.service';

export interface MoviesState {
  movies: Movie[];
  showsAPI: Movie[];
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
  private readonly showsAPI$ = this.select((state) => state.showsAPI);
  readonly vm$ = this.select({
    shows: this.shows$,
    movies: this.movies$,
    series: this.series$,
    showsAPI: this.showsAPI$,
  });
  readonly signal = signal<string>('all');

  constructor(
    private readonly watchlistService: WatchListService,
    private readonly movieMapperService: MovieMapperService
  ) {
    super({ movies: [], showsAPI: [] });
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

  readonly searchMovies = this.effect(
    (trigger$: Observable<{ search: string }>) => {
      return trigger$.pipe(
        debounceTime(300),
        exhaustMap((value) => {
          return this.watchlistService.searchMovies(value.search.trim()).pipe(
            map((res) => this.movieMapperService.mapMovies(res.Search)),
            tap((value: Movie[]) => {
              if (value === undefined) return this.patchState({ showsAPI: [] });
              else {
                return this.patchState({ showsAPI: value });
              }
            })
          );
        })
      );
    }
  );

  addMovie = this.updater((state, newMovie: Movie) => ({
    ...state,
    movies: [...state.movies, newMovie],
  }));

  switchShows(value: string) {
    this.signal.set(value);
  }
}
