import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { CrudOperations } from 'src/app/models/crudOperations';
import { environment } from 'src/environments/environment';

export abstract class HttpService<T> implements CrudOperations<T> {
  private apiBase: string = environment.backURL;

  constructor(protected _http: HttpClient) {}

  post(body: T): Observable<T> {
    return this._http.post<T>(this.apiBase, body);
  }

  put(id: number, body: T): Observable<T> {
    return this._http.put<T>(this.apiBase + '/' + id, body, {});
  }

  getOne(id: number): Observable<T> {
    return this._http.get<T>(this.apiBase + '/' + id);
  }

  getAll(): Observable<T[]> {
    return this._http.get<T[]>(this.apiBase);
  }

  delete(id: number): Observable<T> {
    return this._http.delete<T>(this.apiBase + '/' + id);
  }
}