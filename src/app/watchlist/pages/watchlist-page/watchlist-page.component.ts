import { Component, OnInit } from '@angular/core';
import { WatchlistSearchDialogComponent } from '../../components/watchlist-search-dialog/watchlist-search-dialog.component';
import { WatchlistPageStore } from './watchlist-page.store';
import { WatchlistCollectionComponent } from '../../components/watchlist-collection/watchlist-collection.component';
import { AsyncPipe } from '@angular/common';
import { Movie } from '../../models/movie.model';

@Component({
  selector: 'app-watchlist-page',
  standalone: true,
  imports: [
    WatchlistSearchDialogComponent,
    WatchlistCollectionComponent,
    AsyncPipe,
  ],
  templateUrl: './watchlist-page.component.html',
  styleUrl: './watchlist-page.component.scss',
  providers: [WatchlistPageStore],
})
export class WatchlistPageComponent implements OnInit {
  readonly movies$ = this.watchlistPageStore.movies$;

  constructor(private readonly watchlistPageStore: WatchlistPageStore) {}

  ngOnInit(): void {
    this.watchlistPageStore.getMovies();
  }

  addNewMovie(movie: Movie): void {
    this.watchlistPageStore.postMovie(movie);
  }
}
