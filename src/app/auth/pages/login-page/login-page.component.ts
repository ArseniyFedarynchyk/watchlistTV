import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import {
  FormBuilder,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { LoginPageStore } from './login-page.store';
import { AuthService } from '../../services/auth.service';
import { AsyncPipe, CommonModule } from '@angular/common';

@Component({
  selector: 'app-login-page',
  standalone: true,
  imports: [
    MatIconModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    ReactiveFormsModule,
    AsyncPipe,
  ],
  templateUrl: './login-page.component.html',
  styleUrl: './login-page.component.scss',
  providers: [LoginPageStore],
})
export class LoginPageComponent {
  vm$ = this.loginPageStore.vm$;

  readonly authForm = this.fb.nonNullable.group({
    email: ['', Validators.required],
    password: ['', Validators.required],
  });

  constructor(
    private readonly fb: FormBuilder,
    private readonly loginPageStore: LoginPageStore,
    private readonly authService: AuthService
  ) {}

  onSubmit(): void {
    const rawFormValue = this.authForm.getRawValue();
    this.loginPageStore.login(rawFormValue);
  }
}
