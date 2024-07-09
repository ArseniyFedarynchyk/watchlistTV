import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { provideFirebaseApp, initializeApp } from '@angular/fire/app';
import { provideAuth, getAuth } from '@angular/fire/auth';
import { provideHttpClient } from '@angular/common/http';

const firebaseConfig = {
  apiKey: 'AIzaSyCT3L2UPj2T4j4wGhDq56rC8QYn29t0RT4',
  authDomain: 'watchlist-3ba9f.firebaseapp.com',
  projectId: 'watchlist-3ba9f',
  storageBucket: 'watchlist-3ba9f.appspot.com',
  messagingSenderId: '122589501292',
  appId: '1:122589501292:web:1dc119dc9695e21a610549',
};

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideHttpClient(),
    provideAnimationsAsync(),
    provideFirebaseApp(() => initializeApp(firebaseConfig)),
    provideAuth(() => getAuth()),
  ],
};
