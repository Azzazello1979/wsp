import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class HttpService<T> {
  constructor(private http: HttpClient, private router: Router) {}

  get(route: string, id?: string) {
    if (!id) {
      return this.http.get<T>(`${environment.backURL}/${route}`);
    } else {
      return this.http.get<T>(`${environment.backURL}/${route}/${id}`);
    }
  }

  post(route: string, body: any) {
    return this.http.post<T>(`${environment.backURL}/${route}`, body);
  }
}
