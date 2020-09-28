import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { CrudOperations } from 'src/app/models/crudOperations';
import { environment } from 'src/environments/environment';
import { delay } from 'rxjs/operators';
import { CentralService } from 'src/app/services/central.service';

export abstract class HttpService<T> implements CrudOperations<T> {
  apiBase: string = environment.backURL;

  constructor(
    protected centralService: CentralService,
    protected http: HttpClient,
    public endPoint: string
  ) {}

  post(bodyObj: T): Observable<any> {
    this.centralService.busyON();
    return this.http
      .post<T>(`${this.apiBase}/${this.endPoint}`, bodyObj)
      .pipe(delay(500));
  }

  put(id: number, bodyObj: any): Observable<any> {
    this.centralService.busyON();
    return this.http
      .put<any>(this.apiBase + '/' + id, bodyObj)
      .pipe(delay(500));
  }

  patch(id: number, bodyObj: any): Observable<any> {
    console.log(id, bodyObj);
    this.centralService.busyON();
    return this.http
      .patch<any>(`${this.apiBase}/${this.endPoint}/${id}`, bodyObj)
      .pipe(delay(500));
  }

  getOne(id: number): Observable<any> {
    this.centralService.busyON();
    return this.http.get<T>(this.apiBase + '/' + id).pipe(delay(500));
  }

  getAll(): Observable<any[]> {
    this.centralService.busyON();
    return this.http
      .get<T[]>(`${this.apiBase}/${this.endPoint}`)
      .pipe(delay(500));
  }

  delete(id: number): Observable<any> {
    this.centralService.busyON();
    return this.http.delete<T>(this.apiBase + '/' + id).pipe(delay(500));
  }
}
