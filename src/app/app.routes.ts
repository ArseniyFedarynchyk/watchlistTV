import { Routes } from '@angular/router';
import { LoginPageComponent } from './auth/pages/login-page/login-page.component';
import { unAuthGuard } from './core/guards/un-auth.guard';

export const routes: Routes = [
  { path: 'login', component: LoginPageComponent, canActivate: [unAuthGuard] },
];
