import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpService } from 'src/app/services/abstract/http.service';
import { User } from 'src/app/models/User';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { delay } from 'rxjs/operators';

// AKA: AUTH SERVICE
@Injectable({
  providedIn: 'root',
})
export class UserService extends HttpService<User> {
  constructor(protected http: HttpClient, protected router: Router) {
    super(http, 'users');
  }

  getUsers(): Observable<User[]> {
    return this.getAll().pipe(delay(1000)); // delay just to show spinner :-)
  }

  logoutUser() {
    localStorage.removeItem('token');
    this.router.navigate(['login']);
  }

  // either login or register user at backEnd
  sendUserDataToBackEnd(body: User, intent: string): Observable<any> {
    body.intent = intent;
    return this.http.post(`${this.apiBase}/users`, body);
  }
}
