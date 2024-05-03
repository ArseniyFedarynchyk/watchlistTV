import { Component } from '@angular/core';
import { IsActiveMatchOptions, Router, RouterOutlet } from '@angular/router';
import { HeaderComponent } from './shared/components/header/header.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, HeaderComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  get isLoginPageShown(): boolean {
    const matchOptions: IsActiveMatchOptions = {
      matrixParams: 'subset',
      queryParams: 'ignored',
      paths: 'exact',
      fragment: 'ignored',
    };
    return this.router.isActive('/login', matchOptions);
  }

  constructor(private readonly router: Router) {}
}
