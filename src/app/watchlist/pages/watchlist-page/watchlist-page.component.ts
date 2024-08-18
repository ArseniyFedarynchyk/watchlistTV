import { Component, OnInit } from '@angular/core';
import { WatchlistSearchDialogComponent } from '../../components/watchlist-search-dialog/watchlist-search-dialog.component';
import { WatchlistPageStore } from './watchlist-page.store';
import { WatchlistCollectionComponent } from '../../components/watchlist-collection/watchlist-collection.component';
import { AsyncPipe } from '@angular/common';
import { Movie } from '../../models/movie.model';
import { WatchlistHeaderComponent } from '../../components/watchlist-header/watchlist-header.component';
import { WatchListService } from '../../services/watchlist.service';

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
  // readonly shows$ = this.watchlistPageStore.shows$;
  // readonly movies$ = this.watchlistPageStore.movies$;
  // readonly series$ = this.watchlistPageStore.series$;
  readonly isDialogOpen = this.watchListService.isDialogOpen;
  readonly signal = this.watchlistPageStore.signal;
  readonly vm$ = this.watchlistPageStore.vm$;

  constructor(
    private readonly watchlistPageStore: WatchlistPageStore,
    private readonly watchListService: WatchListService
  ) {}

  ngOnInit(): void {
    this.watchlistPageStore.getMovies();
  }

  addNewMovie(movie: Movie): void {
    this.watchlistPageStore.postMovie(movie);
  }

  filterShows(value: string): void {
    this.signal.set(value);
  }
}
