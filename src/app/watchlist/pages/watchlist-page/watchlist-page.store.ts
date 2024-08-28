import { Injectable, signal } from '@angular/core';
import { Movie } from '../../models/movie.model';
import { ComponentStore } from '@ngrx/component-store';
import { debounceTime, exhaustMap, map, mergeMap, Observable, tap } from 'rxjs';
import { WatchListService } from '../../services/watchlist.service';
import { MovieMapperService } from '../../services/movie-mapper.service';

export interface MoviesState {
  shows: Movie[];
  showsAPI: Movie[];
}

@Injectable()
export class WatchlistPageStore extends ComponentStore<MoviesState> {
  private readonly shows$ = this.select((state) => state.shows);
  private readonly movies$ = this.select((state) =>
    state.shows.filter((show) => show.type === 'movie')
  );
  private readonly series$ = this.select((state) =>
    state.shows.filter((show) => show.type === 'series')
  );
  private readonly showsAPI$ = this.select((state) => state.showsAPI);
  private readonly showsWithExtinsesCheck$ = this.select(
    this.shows$,
    this.showsAPI$,
    (shows, showsAPI) =>
      showsAPI.map((show) => ({
        ...show,
        isAdded: shows.some((movie) => movie.imdbID === show.imdbID),
      }))
  );
  readonly vm$ = this.select({
    shows: this.shows$,
    movies: this.movies$,
    series: this.series$,
    showsAPI: this.showsAPI$,
    showsWithExtinsesCheck: this.showsWithExtinsesCheck$,
  });
  readonly signal = signal<string>('all');

  constructor(
    private readonly watchlistService: WatchListService,
    private readonly movieMapperService: MovieMapperService
  ) {
    super({ shows: [], showsAPI: [] });
  }

  getMovies = this.effect((trigger$) => {
    return trigger$.pipe(
      exhaustMap(() => {
        return this.watchlistService
          .getMovies()
          .pipe(tap((shows) => this.patchState({ shows: shows })));
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
            tap((shows: Movie[]) => {
              if (shows === undefined) return this.patchState({ showsAPI: [] });
              else {
                return this.patchState({ showsAPI: shows });
              }
            })
          );
        })
      );
    }
  );

  addMovie = this.updater((state, newShow: Movie) => ({
    ...state,
    movies: [...state.shows, newShow],
  }));

  switchShows(value: string) {
    this.signal.set(value);
  }
}
