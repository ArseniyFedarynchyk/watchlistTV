import { Injectable } from '@angular/core';
import { ComponentStore } from '@ngrx/component-store';
import { exhaustMap, tap } from 'rxjs';
import { AuthService } from '../../services/auth.service';
import { tapResponse } from '@ngrx/operators';
import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';

interface LoginPageState {
  isLoading: boolean;
  error: string | null;
  isPasswordHidden: boolean;
}

export interface Credentials {
  email: string;
  password: string;
}

@Injectable()
export class LoginPageStore extends ComponentStore<LoginPageState> {
  private readonly isLoading$ = this.select((state) => state.isLoading);
  private readonly error$ = this.select((state) => state.error);
  private readonly isPasswordHidden$ = this.select(
    (state) => state.isPasswordHidden
  );

  readonly vm$ = this.select({
    isLoading: this.isLoading$,
    error: this.error$,
    isPasswordHidden: this.isPasswordHidden$,
  });

  constructor(
    private readonly authService: AuthService,
    private readonly router: Router
  ) {
    super({ isLoading: false, error: null, isPasswordHidden: true });
  }

  readonly login = this.effect<Credentials>((source$) => {
    return source$.pipe(
      tap(() => this.patchState({ isLoading: true, error: null })),
      exhaustMap((credentials) =>
        this.authService.login(credentials.email, credentials.password).pipe(
          tapResponse({
            next: () => {
              this.router.navigate(['/']);
            },
            error: (error: HttpErrorResponse) => {
              this.patchState({ error: 'Worng Credentials!' });
            },
            finalize: () => this.patchState({ isLoading: false }),
          })
        )
      )
    );
  });

  togglePasswordVisibility(): void {
    this.patchState((state) => ({ isPasswordHidden: !state.isPasswordHidden }));
  }
}
