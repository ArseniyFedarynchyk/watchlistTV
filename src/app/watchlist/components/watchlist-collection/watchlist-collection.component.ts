import { Component, input, output } from '@angular/core';
import { Movie } from '../../models/movie.model';
import { MatIconModule } from '@angular/material/icon';
import { NgOptimizedImage } from '@angular/common';
import { MovieCardComponent } from '../movie-card/movie-card.component';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-watchlist-collection',
  standalone: true,
  imports: [
    MatIconModule,
    NgOptimizedImage,
    MovieCardComponent,
    MatButtonModule,
    MatIconModule,
  ],
  templateUrl: './watchlist-collection.component.html',
  styleUrl: './watchlist-collection.component.scss',
})
export class WatchlistCollectionComponent {
  readonly movies = input.required<Movie[]>();
  readonly deleteMovie = output<string>();

  onDelete(movieId: string): void {
    this.deleteMovie.emit(movieId);
  }
}
