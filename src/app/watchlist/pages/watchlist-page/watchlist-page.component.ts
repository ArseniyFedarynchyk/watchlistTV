import { Component, inject, OnInit } from '@angular/core';
import { WatchlistSearchDialogComponent } from '../../components/watchlist-search-dialog/watchlist-search-dialog.component';
import { WatchlistPageStore } from './watchlist-page.store';

@Component({
  selector: 'app-watchlist-page',
  standalone: true,
  imports: [WatchlistSearchDialogComponent],
  templateUrl: './watchlist-page.component.html',
  styleUrl: './watchlist-page.component.scss',
  providers: [WatchlistPageStore],
})
export class WatchlistPageComponent implements OnInit {
  constructor(private readonly watchlistPageStore: WatchlistPageStore) {}

  ngOnInit(): void {
    this.watchlistPageStore.getMovies();
  }
}
