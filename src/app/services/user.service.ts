import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpService } from 'src/app/services/http.service';
import { User } from 'src/app/models/User';

@Injectable({
  providedIn: 'root',
})
export class UserService extends HttpService<User> {
  constructor(protected _http: HttpClient) {
    super(_http);
  }
}
