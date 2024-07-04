import { Injectable } from '@angular/core';
import { ComponentStore } from '@ngrx/component-store';
import { WatchlistSearchDialogComponent } from './watchlist-search-dialog.component';
import { tap } from 'rxjs';

interface WatchlistState {
  searchFormValue: ReturnType<
    WatchlistSearchDialogComponent['searchForm']['getRawValue']
  > | null;
}

@Injectable()
export class WatchListSearchDialogStore extends ComponentStore<WatchlistState> {
  constructor() {
    super({ searchFormValue: null });
  }

  readonly updateFormValue = this.effect<
    ReturnType<WatchlistSearchDialogComponent['searchForm']['getRawValue']>
  >((trigger$) => {
    return trigger$.pipe(
      tap((value) => {
        console.log(value.search);
        return this.patchState({ searchFormValue: value });
      })
    );
  });
}
