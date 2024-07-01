import { Injectable } from '@angular/core';
import {
  Auth,
  signInWithEmailAndPassword,
  user,
  signOut,
} from '@angular/fire/auth';
import { Observable, from } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  user$ = user(this.fireAuth);

  constructor(private readonly fireAuth: Auth) {}

  login(email: string, password: string): Observable<void> {
    const promise = signInWithEmailAndPassword(
      this.fireAuth,
      email,
      password
    ).then(() => {});
    return from(promise);
  }

  logout(): Observable<void> {
    const promise = signOut(this.fireAuth);
    return from(promise);
  }
}
