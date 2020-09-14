import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpService } from 'src/app/services/abstract/http.service';
import { User } from 'src/app/models/User';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class UserService extends HttpService<User> {
  constructor(protected _http: HttpClient, private router: Router) {
    super(_http);
  }

  // general, from HttpService
  getUsers(): Observable<User[]> {
    return this.getAll('users');
  }

  // specific, not from HttpService

  logoutUser() {
    localStorage.removeItem('token');
    this.router.navigate(['login']);
  }

  loginUser(body: User): Observable<any> {
    body.intent = 'login';
    return this._http.post(`${this.apiBase}/users`, body);
  }

  saveUser(body: User): Observable<any> {
    body.intent = 'register';
    return this._http.post(`${this.apiBase}/users`, body);
  }
}
