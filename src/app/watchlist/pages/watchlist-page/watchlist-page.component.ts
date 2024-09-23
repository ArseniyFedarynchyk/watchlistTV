import { Component, OnInit } from '@angular/core';
import { WatchlistSearchDialogComponent } from '../../components/watchlist-search-dialog/watchlist-search-dialog.component';
import { WatchlistPageStore } from './watchlist-page.store';
import { WatchlistCollectionComponent } from '../../components/watchlist-collection/watchlist-collection.component';
import { AsyncPipe } from '@angular/common';
import { Movie } from '../../models/movie.model';
import { WatchlistHeaderComponent } from '../../components/watchlist-header/watchlist-header.component';
import { WatchListService } from '../../services/watchlist.service';
import { Observable } from 'rxjs';
import { TypeOfShows } from '../../models/type-of-shows.type';

@Component({
  selector: 'app-watchlist-page',
  standalone: true,
  imports: [
    WatchlistSearchDialogComponent,
    WatchlistCollectionComponent,
    WatchlistHeaderComponent,
    AsyncPipe,
  ],
  templateUrl: './watchlist-page.component.html',
  styleUrl: './watchlist-page.component.scss',
  providers: [WatchlistPageStore],
})
export class WatchlistPageComponent implements OnInit {
  readonly isDialogOpen = this.watchListService.isDialogOpen;
  readonly typeOfShows = this.watchlistPageStore.typeOfShows;
  readonly vm$ = this.watchlistPageStore.vm$;

  constructor(
    private readonly watchlistPageStore: WatchlistPageStore,
    private readonly watchListService: WatchListService
  ) {}

  ngOnInit(): void {
    this.watchlistPageStore.getShows();
  }

  addNewMovie(newShow: Movie): void {
    this.watchlistPageStore.postShow(newShow);
  }

  filterShows(typeOfShows: TypeOfShows): void {
    this.typeOfShows.set(typeOfShows);
  }

  onDelete(showId: string) {
    this.watchlistPageStore.removeShow(showId);
  }

  onShowSearch(formValue: Observable<{ search: string }>): void {
    this.watchlistPageStore.searchShows(formValue);
  }
}
