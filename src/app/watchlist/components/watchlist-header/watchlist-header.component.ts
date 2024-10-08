import { Component, output } from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { AuthService } from '../../../auth/services/auth.service';
import { WatchListService } from '../../services/watchlist.service';
import { TypeOfShows } from '../../models/type-of-shows.type';

@Component({
  selector: 'app-watchlist-header',
  standalone: true,
  imports: [MatToolbarModule, MatButtonModule, MatIconModule, MatTooltipModule],
  templateUrl: './watchlist-header.component.html',
  styleUrl: './watchlist-header.component.scss',
})
export class WatchlistHeaderComponent {
  onShowsFilter = output<TypeOfShows>();

  constructor(
    private readonly authService: AuthService,
    private readonly wathclistService: WatchListService
  ) {}

  logout(): void {
    this.authService.logout();
  }

  openDialog(): void {
    this.wathclistService.isDialogOpen.set(true);
  }

  filterShows(typeOfShows: TypeOfShows): void {
    this.onShowsFilter.emit(typeOfShows);
  }
}
