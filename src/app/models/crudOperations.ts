import { Observable } from 'rxjs';

export interface CrudOperations<T> {
  apiBase: string;
  endPoint: string;
  post(body: T): Observable<T>;
  put(id: number, body: T): Observable<T>;
  patch(id: number, body: any): Observable<any>;
  getOne(id: number): Observable<T>;
  getAll(): Observable<T[]>;
  delete(id: number): Observable<any>;
}
