import { Injectable, signal } from '@angular/core';
import {
  Auth,
  signInWithEmailAndPassword,
  user,
  signOut,
} from '@angular/fire/auth';
import { Observable, from } from 'rxjs';
import { User } from '../models/user.model';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  user$ = user(this.fireAuth);
  currentUser = signal<User | null | undefined>(undefined);

  constructor(
    private readonly fireAuth: Auth,
    private readonly router: Router
  ) {}

  login(email: string, password: string): Observable<void> {
    const promise = signInWithEmailAndPassword(
      this.fireAuth,
      email,
      password
    ).then(() => {});
    return from(promise);
  }

  logout(): Observable<void> {
    this.currentUser.set(null);
    this.router.navigateByUrl('/login');
    const promise = signOut(this.fireAuth);
    return from(promise);
  }
}
