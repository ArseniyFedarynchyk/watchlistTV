import { Component } from '@angular/core';
import { WatchlistSearchDialogComponent } from '../../components/watchlist-search-dialog/watchlist-search-dialog.component';

@Component({
  selector: 'app-watchlist-page',
  standalone: true,
  imports: [WatchlistSearchDialogComponent],
  templateUrl: './watchlist-page.component.html',
  styleUrl: './watchlist-page.component.scss',
})
export class WatchlistPageComponent {}
