import { Injectable } from '@angular/core';
import { Auth, signInWithEmailAndPassword } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { Observable, from } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(
    private readonly fireAtuh: Auth,
    private readonly router: Router
  ) {}

  login(email: string, password: string): Observable<void> {
    const promise = signInWithEmailAndPassword(
      this.fireAtuh,
      email,
      password
    ).then(() => {});
    return from(promise);
  }
}
