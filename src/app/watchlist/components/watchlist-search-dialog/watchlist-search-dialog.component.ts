import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { WatchListSearchDialogStore } from './watchlist-search-dialog.store';
import { map, startWith } from 'rxjs';

@Component({
  selector: 'app-watchlist-search-dialog',
  standalone: true,
  imports: [
    MatInputModule,
    MatFormFieldModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  templateUrl: './watchlist-search-dialog.component.html',
  styleUrl: './watchlist-search-dialog.component.scss',
  providers: [WatchListSearchDialogStore],
})
export class WatchlistSearchDialogComponent implements OnInit {
  searchForm = this.fb.nonNullable.group({
    search: '',
  });
  private readonly searchFormValue$ = this.searchForm.valueChanges.pipe(
    startWith(''),
    map(() => this.searchForm.getRawValue())
  );

  constructor(
    private readonly fb: FormBuilder,
    private readonly watchListSearchDialogStore: WatchListSearchDialogStore
  ) {}

  ngOnInit(): void {
    this.watchListSearchDialogStore.getMovies(this.searchFormValue$);
  }
}
