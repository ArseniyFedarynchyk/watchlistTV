import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ServerResponse } from '../models/server-response.model';

@Injectable({
  providedIn: 'root',
})
export class WatchListService {
  constructor(private readonly http: HttpClient) {}

  getMovies(movie: string): Observable<ServerResponse> {
    return this.http.get<ServerResponse>(
      `http://www.omdbapi.com/?s=${movie}&apikey=ac98c329`
    );
  }
}
