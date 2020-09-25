import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { delay } from 'rxjs/operators';
import { User } from 'src/app/models/User';
import { HttpService } from 'src/app/services/abstract/http.service';
import { CentralService } from 'src/app/services/central.service';

// AKA: AUTH SERVICE
@Injectable({
  providedIn: 'root',
})
export class UserService extends HttpService<User> {
  constructor(
    protected centralService: CentralService,
    protected http: HttpClient,
    protected router: Router
  ) {
    super(centralService, http, 'users');
  }

  getUsers(): Observable<User[]> {
    return this.getAll();
  }

  logoutUser() {
    localStorage.removeItem('token');
    this.router.navigate(['login']);
  }

  // SPECIFIC HTTP CALLS - not from  HttpService Abstract class
  // either login or register user at backEnd
  sendUserDataToBackEnd(body: User, intent: string): Observable<any> {
    this.centralService.busyON();
    body.intent = intent;
    return this.http.post(`${this.apiBase}/users`, body).pipe(delay(2000));
  }
}
