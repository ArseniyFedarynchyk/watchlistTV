import { Component } from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { AuthService } from '../../../auth/services/auth.service';
import { WatchListService } from '../../../watchlist/services/watchlist.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [MatToolbarModule, MatButtonModule, MatIconModule, MatTooltipModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent {
  constructor(
    private readonly authService: AuthService,
    private readonly wathclistService: WatchListService
  ) {}

  logout(): void {
    this.authService.logout();
  }

  openDialog(): void {
    console.log('openDialog button was clicked!');
    this.wathclistService.isDialogOpen.set(true);
  }
}
