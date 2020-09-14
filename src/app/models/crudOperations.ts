import { Observable } from 'rxjs';

export interface CrudOperations<T> {
  post(body: T, path: string): Observable<T>;
  put(id: number, body: T): Observable<T>;
  getOne(id: number): Observable<T>;
  getAll(): Observable<T[]>;
  delete(id: number): Observable<any>;
}
