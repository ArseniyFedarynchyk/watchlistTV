import { HttpClient } from '@angular/common/http';
import { Injectable, signal } from '@angular/core';
import { Observable } from 'rxjs';
import { ServerResponse } from '../models/server-response.model';
import { Firestore, collection, collectionData } from '@angular/fire/firestore';
import { MovieAPI } from '../models/movie-api.model';

@Injectable({
  providedIn: 'root',
})
export class WatchListService {
  movieCollection = collection(this.firestore, 'movies');
  isDialogOpen = signal<boolean>(false);

  constructor(
    private readonly http: HttpClient,
    private readonly firestore: Firestore
  ) {}

  getMovies(): Observable<MovieAPI[]> {
    return collectionData(this.movieCollection) as Observable<MovieAPI[]>;
  }

  searchMovies(movie: string): Observable<ServerResponse> {
    return this.http.get<ServerResponse>(
      `http://www.omdbapi.com/?s=${movie}&apikey=ac98c329`
    );
  }
}
