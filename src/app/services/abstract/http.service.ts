import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { CrudOperations } from 'src/app/models/crudOperations';
import { environment } from 'src/environments/environment';

export abstract class HttpService<T> implements CrudOperations<T> {
  apiBase: string = environment.backURL;

  constructor(protected http: HttpClient, public endPoint: string) {}

  post(body: T): Observable<T> {
    return this.http.post<T>(`${this.apiBase}/${this.endPoint}`, body);
  }

  put(id: number, body: T): Observable<T> {
    return this.http.put<T>(this.apiBase + '/' + id, body, {});
  }

  getOne(id: number): Observable<T> {
    return this.http.get<T>(this.apiBase + '/' + id);
  }

  getAll(): Observable<T[]> {
    return this.http.get<T[]>(`${this.apiBase}/${this.endPoint}`);
  }

  delete(id: number): Observable<T> {
    return this.http.delete<T>(this.apiBase + '/' + id);
  }
}
