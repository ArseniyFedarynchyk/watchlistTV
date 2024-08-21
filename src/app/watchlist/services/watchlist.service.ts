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
import { MovieAPI } from '../models/movie-api.model';
import { Movie } from '../models/movie.model';
import { MovieMapperService } from './movie-mapper.service';
import { MovieResponse } from '../models/movie-response';

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

  getMovies(): Observable<MovieAPI[]> {
    return collectionData(this.movieCollection, {
      idField: 'id',
    }) as Observable<MovieAPI[]>;
  }

  postMovies(movie: MovieResponse) {
    const movieMapped = this.movieMapperService.mapMovieToAPIModel(movie);
    const promise = addDoc(this.movieCollection, movieMapped);
    return from(promise);
  }

  searchMovies(movie: string): Observable<ServerResponse> {
    return this.http.get<ServerResponse>(
      `http://www.omdbapi.com/?s=${movie}&apikey=ac98c329`
    );
  }

  removeMovie(movieId: string): Observable<void> {
    const docRef = doc(this.firestore, 'movies/' + movieId);
    const promise = deleteDoc(docRef);
    return from(promise);
  }
}
