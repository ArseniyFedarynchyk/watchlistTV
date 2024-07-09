import { Injectable } from '@angular/core';
import { ComponentStore } from '@ngrx/component-store';
import { WatchlistSearchDialogComponent } from './watchlist-search-dialog.component';
import { debounceTime, exhaustMap, map, Observable, tap } from 'rxjs';
import { WatchListService } from '../../services/watchlist.service';
import { Movie } from '../../models/movie.model';
import { MovieMapperService } from '../../services/movie-mapper.service';

interface WatchlistState {
  movies: Movie[];
}

@Injectable()
export class WatchListSearchDialogStore extends ComponentStore<WatchlistState> {
  readonly movies$ = this.select((state) => state.movies);

  constructor(
    private readonly watchListService: WatchListService,
    private readonly mapper: MovieMapperService
  ) {
    super({ movies: [] });
  }

  readonly getMovies = this.effect(
    (
      trigger$: Observable<{
        search: string | '';
      }>
    ) => {
      return trigger$.pipe(
        debounceTime(300),
        exhaustMap((value) => {
          return this.watchListService.getMovies(value.search.trim()).pipe(
            map((res) => this.mapper.mapMovies(res)),
            tap((value: Movie[]) => {
              if (value === undefined) return this.patchState({ movies: [] });
              else {
                return this.patchState({ movies: value });
              }
            })
          );
        })
      );
    }
  );
}
