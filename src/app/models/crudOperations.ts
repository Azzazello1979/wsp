import { Observable } from 'rxjs';

export interface CrudOperations<T> {
  post(path: string, body: T): Observable<T>;
  put(id: number, body: T): Observable<T>;
  getOne(id: number): Observable<T>;
  getAll(path: string): Observable<T[]>;
  delete(id: number): Observable<any>;
}
