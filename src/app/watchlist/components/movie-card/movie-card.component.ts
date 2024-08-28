import { NgOptimizedImage } from '@angular/common';
import { Component, input } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { YearOfProductionPipe } from '../../pipes/year-of-production.pipe';

@Component({
  selector: 'app-movie-card',
  standalone: true,
  imports: [NgOptimizedImage, MatIconModule, MatButtonModule, YearOfProductionPipe],
  templateUrl: './movie-card.component.html',
  styleUrl: './movie-card.component.scss',
})
export class MovieCardComponent {
  readonly poster = input.required<string>();
  readonly title = input.required<string>();
  readonly year = input.required<string>();
  readonly type = input.required<string>();
  readonly imdbID = input.required<string>();
}
