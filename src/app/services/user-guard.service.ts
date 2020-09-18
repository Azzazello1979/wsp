import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class UserGuardService implements CanActivate {
  constructor(private router: Router) {}

  canActivate(): boolean {
    let hasToken = localStorage.getItem('token');
    if (hasToken) {
      return true;
    } else {
      this.router.navigate(['login']);
    }
  }
}
