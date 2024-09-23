import { HttpClient } from '@angular/common/http';
import { Injectable, signal } from '@angular/core';
import { from, Observable } from 'rxjs';
import { ServerResponse } from '../models/server-response.model';
import {
  Firestore,
  addDoc,
  collection,
  collectionData,
  deleteDoc,
  doc,
} from '@angular/fire/firestore';
import { Movie } from '../models/movie.model';
import { MovieMapperService } from './movie-mapper.service';

@Injectable({
  providedIn: 'root',
})
export class WatchListService {
  movieCollection = collection(this.firestore, 'movies');
  isDialogOpen = signal<boolean>(false);

  constructor(
    private readonly http: HttpClient,
    private readonly firestore: Firestore,
    private readonly movieMapperService: MovieMapperService
  ) {}

  getShows(): Observable<Movie[]> {
    return collectionData(this.movieCollection, {
      idField: 'id',
    }) as Observable<Movie[]>;
  }

  postShows(show: Movie) {
    const promise = addDoc(this.movieCollection, show);
    return from(promise);
  }

  searchShows(movieTitle: string): Observable<ServerResponse> {
    return this.http.get<ServerResponse>(
      `http://www.omdbapi.com/?s=${movieTitle}&apikey=ac98c329`
    );
  }

  removeShow(showId: string): Observable<void> {
    const docRef = doc(this.firestore, 'movies/' + showId);
    const promise = deleteDoc(docRef);
    return from(promise);
  }
}
