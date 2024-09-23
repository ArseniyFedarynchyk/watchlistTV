import { Injectable, signal } from '@angular/core';
import { Movie } from '../../models/movie.model';
import { ComponentStore } from '@ngrx/component-store';
import {
  debounceTime,
  exhaustMap,
  map,
  mergeMap,
  Observable,
  switchMap,
  tap,
} from 'rxjs';
import { WatchListService } from '../../services/watchlist.service';
import { MovieMapperService } from '../../services/movie-mapper.service';
import { TypeOfShows } from '../../models/type-of-shows.type';

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

  private readonly showsWithExistenceCheck$ = this.select(
    this.shows$,
    this.showsAPI$,
    (shows, showsAPI) =>
      showsAPI.map((showAPI) => ({
        ...showAPI,
        isAdded: shows.some((show) => show.imdbID === showAPI.imdbID),
      }))
  );

  readonly vm$ = this.select({
    shows: this.shows$,
    movies: this.movies$,
    series: this.series$,
    showsAPI: this.showsAPI$,
    showsWithExistenceCheck: this.showsWithExistenceCheck$,
  });

  readonly typeOfShows = signal<TypeOfShows>('all');

  constructor(
    private readonly watchListService: WatchListService,
    private readonly movieMapperService: MovieMapperService
  ) {
    super({ shows: [], showsAPI: [] });
  }

  readonly getShows = this.effect((trigger$) => {
    return trigger$.pipe(
      exhaustMap(() => {
        return this.watchListService
          .getShows()
          .pipe(tap((shows) => this.patchState({ shows: shows })));
      })
    );
  });

  readonly postShow = this.effect((trigger$: Observable<Movie>) => {
    return trigger$.pipe(
      mergeMap((newShow) => {
        return this.watchListService.postShows(newShow);
      })
    );
  });

  readonly removeShow = this.effect((trigger$: Observable<string>) => {
    return trigger$.pipe(
      exhaustMap((showId) => {
        return this.watchListService.removeShow(showId);
      })
    );
  });

  readonly searchShows = this.effect(
    (trigger$: Observable<{ search: string }>) => {
      return trigger$.pipe(
        debounceTime(300),
        map((formValue) => formValue.search.trim()),
        switchMap((formValue) => {
          return this.watchListService.searchShows(formValue).pipe(
            map((serverResponse) =>
              this.movieMapperService.mapMovies(serverResponse.Search)
            ),
            tap((shows: Movie[] | undefined) =>
              this.patchState({ showsAPI: shows ?? [] })
            )
          );
        })
      );
    }
  );

  // readonly addMovie = this.updater((state, newShow: Movie) => ({
  //   ...state,
  //   movies: [...state.shows, newShow],
  // }));

  // switchShows(value: TypeOfShows): void {
  //   this.typeOfShows.set(value);
  // }
}
