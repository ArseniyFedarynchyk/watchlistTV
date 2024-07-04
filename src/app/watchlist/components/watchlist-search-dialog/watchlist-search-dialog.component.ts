import { Component } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-watchlist-search-dialog',
  standalone: true,
  imports: [MatInputModule, MatFormFieldModule],
  templateUrl: './watchlist-search-dialog.component.html',
  styleUrl: './watchlist-search-dialog.component.scss',
})
export class WatchlistSearchDialogComponent {}
