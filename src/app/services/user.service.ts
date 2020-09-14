import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpService } from 'src/app/services/abstract/http.service';
import { User } from 'src/app/models/User';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserService extends HttpService<User> {
  constructor(protected _http: HttpClient) {
    super(_http);
  }

  // general, from HttpService
  getUsers(): Observable<User[]> {
    return this.getAll('users');
  }

  // specific, not from HttpService
  saveUser(body: User): Observable<any> {
    return this._http.post(`${this.apiBase}/users`, body);
  }
}
