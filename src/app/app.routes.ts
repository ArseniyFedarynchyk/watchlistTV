import { Routes } from '@angular/router';
import { LoginPageComponent } from './auth/pages/login-page/login-page.component';
import { unAuthGuard } from './core/guards/un-auth.guard';
import { WatchlistPageComponent } from './watchlist/pages/watchlist-page/watchlist-page.component';
import { authGuard } from './core/guards/auth.guard';

export const routes: Routes = [
  { path: 'login', component: LoginPageComponent, canActivate: [unAuthGuard] },
  { path: '', component: WatchlistPageComponent, canActivate: [authGuard] },
];
