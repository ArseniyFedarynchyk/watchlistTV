import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { WatchListSearchDialogStore } from './watchlist-search-dialog.store';
import { map, startWith } from 'rxjs';
import { AsyncPipe, NgOptimizedImage } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { WatchListService } from '../../services/watchlist.service';
import { MovieCardComponent } from '../movie-card/movie-card.component';

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
  ],
  templateUrl: './watchlist-search-dialog.component.html',
  styleUrl: './watchlist-search-dialog.component.scss',
  providers: [WatchListSearchDialogStore],
})
export class WatchlistSearchDialogComponent implements OnInit {
  isDialogOpen = this.watchListService.isDialogOpen;
  readonly movies$ = this.watchListSearchDialogStore.movies$;

  searchForm = this.fb.nonNullable.group({
    search: '',
  });
  private readonly searchFormValue$ = this.searchForm.valueChanges.pipe(
    startWith(''),
    map(() => this.searchForm.getRawValue())
  );

  constructor(
    private readonly fb: FormBuilder,
    private readonly watchListSearchDialogStore: WatchListSearchDialogStore,
    private readonly watchListService: WatchListService
  ) {}

  ngOnInit(): void {
    this.watchListSearchDialogStore.getMovies(this.searchFormValue$);
  }

  closeDialog(): void {
    this.watchListService.isDialogOpen.set(false);
  }
}
