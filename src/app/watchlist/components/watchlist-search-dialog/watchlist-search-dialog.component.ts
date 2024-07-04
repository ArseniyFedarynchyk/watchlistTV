import { Component } from '@angular/core';
import { FormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

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
})
export class WatchlistSearchDialogComponent {
  searchForm = this.fb.nonNullable.group({
    search: [''],
  });

  constructor(private readonly fb: FormBuilder) {}

  onSubmit(): void {
    console.log('submit was clicked!');
  }
}
