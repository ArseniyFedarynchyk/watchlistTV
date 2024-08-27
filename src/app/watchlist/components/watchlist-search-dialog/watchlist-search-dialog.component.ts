import { Component, input, OnInit, output } from '@angular/core';
import { FormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { map, Observable, startWith } from 'rxjs';
import { AsyncPipe, NgOptimizedImage } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { WatchListService } from '../../services/watchlist.service';
import { MovieCardComponent } from '../movie-card/movie-card.component';
import { Movie } from '../../models/movie.model';
import { MatTooltipModule } from '@angular/material/tooltip';

@Component({
  selector: 'app-watchlist-search-dialog',
  standalone: true,
  imports: [
    MatInputModule,
    MatFormFieldModule,
    FormsModule,
    ReactiveFormsModule,
    AsyncPipe,
    MatIconModule,
    MatButtonModule,
    NgOptimizedImage,
    MovieCardComponent,
    MatTooltipModule,
  ],
  templateUrl: './watchlist-search-dialog.component.html',
  styleUrl: './watchlist-search-dialog.component.scss',
})
export class WatchlistSearchDialogComponent implements OnInit {
  readonly shows = input.required<Movie[]>();
  readonly newMovie = output<Movie>();
  readonly searchFormValue = output<Observable<{ search: string }>>();
  isDialogOpen = this.watchListService.isDialogOpen;

  searchForm = this.fb.nonNullable.group({
    search: '',
  });
  private readonly searchFormValue$ = this.searchForm.valueChanges.pipe(
    startWith(''),
    map(() => this.searchForm.getRawValue())
  );

  constructor(
    private readonly fb: FormBuilder,
    private readonly watchListService: WatchListService
  ) {}

  ngOnInit(): void {
    this.searchFormValue.emit(this.searchFormValue$);
  }

  closeDialog(): void {
    this.watchListService.isDialogOpen.set(false);
    this.searchForm.reset();
  }

  addMovie(newMovie: Movie): void {
    this.newMovie.emit({ ...newMovie, id: '' });
  }
}
