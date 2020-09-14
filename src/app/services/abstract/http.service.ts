import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { CrudOperations } from 'src/app/models/crudOperations';
import { environment } from 'src/environments/environment';

export abstract class HttpService<T> implements CrudOperations<T> {
  protected apiBase: string = environment.backURL;

  constructor(protected _http: HttpClient) {}

  post(path: string, body: T): Observable<T> {
    return this._http.post<T>(`${this.apiBase}/${path}`, body);
  }

  put(id: number, body: T): Observable<T> {
    return this._http.put<T>(this.apiBase + '/' + id, body, {});
  }

  getOne(id: number): Observable<T> {
    return this._http.get<T>(this.apiBase + '/' + id);
  }

  getAll(path: string): Observable<T[]> {
    return this._http.get<T[]>(`${this.apiBase}/${path}`);
  }

  delete(id: number): Observable<T> {
    return this._http.delete<T>(this.apiBase + '/' + id);
  }
}
