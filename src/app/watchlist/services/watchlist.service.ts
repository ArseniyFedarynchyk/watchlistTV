import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Movie } from '../models/movie.model';

@Injectable({
  providedIn: 'root',
})
export class WatchListService {
  constructor(private readonly http: HttpClient) {}

  getMovies(movie: string): Observable<Movie[]> {
    return this.http.get<Movie[]>(
      `http://www.omdbapi.com/?s=${movie}&apikey=ac98c329`
    );
  }
}
