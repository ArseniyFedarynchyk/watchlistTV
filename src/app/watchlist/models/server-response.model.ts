import { Movie } from './movie.model';

export interface ServerResponse {
  Response: string;
  Search: Movie[];
  totalResults: string;
}
