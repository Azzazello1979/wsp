import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { delay } from 'rxjs/operators';
import { User } from 'src/app/models/User';
import { HttpService } from 'src/app/services/abstract/http.service';
import { CentralService } from 'src/app/services/central.service';

export interface AuthResponse {
  token: string;
}

// AKA: AUTH SERVICE
@Injectable({
  providedIn: 'root',
})
export class UserService extends HttpService<User> {
  private userAuthenticated: boolean = false;

  constructor(
    protected centralService: CentralService,
    protected http: HttpClient,
    protected router: Router
  ) {
    super(centralService, http, 'users');
  }

  authenticatedSequence(token: string) {
    this.centralService.busyOFF();
    this.userAuthenticated = true;
    localStorage.setItem('token', token);
    this.router.navigate(['dashboard/home']);
  }

  notAuthenticatedSequence(err) {
    this.centralService.busyOFF();
    this.userAuthenticated = false;
    return console.log(err);
  }

  returnUserAuthenticationStatus() {
    return this.userAuthenticated;
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
  sendUserDataToBackEnd(body: User, intent: string) {
    this.centralService.busyON();
    body.intent = intent;
    this.http.post(`${this.apiBase}/users`, body).subscribe(
      (response: AuthResponse) => {
        this.authenticatedSequence(response.token);
      },
      (err) => {
        return this.notAuthenticatedSequence(err);
      }
    );
  }
}
