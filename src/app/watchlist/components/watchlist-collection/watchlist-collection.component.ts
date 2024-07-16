import { Component, input } from '@angular/core';
import { Movie } from '../../models/movie.model';
import { MatIconModule } from '@angular/material/icon';
import { NgOptimizedImage } from '@angular/common';
import { MovieCardComponent } from '../movie-card/movie-card.component';

@Component({
  selector: 'app-watchlist-collection',
  standalone: true,
  imports: [MatIconModule, NgOptimizedImage, MovieCardComponent],
  templateUrl: './watchlist-collection.component.html',
  styleUrl: './watchlist-collection.component.scss',
})
export class WatchlistCollectionComponent {
  readonly movies = input.required<Movie[]>();
}
