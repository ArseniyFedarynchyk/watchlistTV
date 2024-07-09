import { Injectable } from '@angular/core';
import { ComponentStore } from '@ngrx/component-store';
import { WatchlistSearchDialogComponent } from './watchlist-search-dialog.component';
import { debounceTime, exhaustMap, map, Observable, tap } from 'rxjs';
import { WatchListService } from '../../services/watchlist.service';
import { Movie } from '../../models/movie.model';

interface WatchlistState {
  searchFormValue: ReturnType<
    WatchlistSearchDialogComponent['searchForm']['getRawValue']
  > | null;
  movies: Movie[];
}

@Injectable()
export class WatchListSearchDialogStore extends ComponentStore<WatchlistState> {
  constructor(private readonly watchListService: WatchListService) {
    super({ searchFormValue: null, movies: [] });
  }

  readonly getMovies = this.effect(
    (
      trigger$: Observable<{
        search: string | null;
      }>
    ) => {
      return trigger$.pipe(
        debounceTime(300),
        exhaustMap((value) => {
          return this.watchListService.getMovies(value.search?.trim()).pipe(
            map((value) => value.Search),
            tap((value: Movie[]) => {
              return this.patchState({ movies: value });
            })
          );
        })
      );
    }
  );
}
