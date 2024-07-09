import { MovieAPI } from './movie-api.model';

export interface ServerResponse {
  Response: string;
  Search: MovieAPI[];
  totalResults: string;
}
