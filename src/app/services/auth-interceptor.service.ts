import {
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AuthInterceptorService implements HttpInterceptor {
  intercept(req: HttpRequest<any>, next: HttpHandler) {
    let token = localStorage.getItem('token');
    let bearerToken = `Bearer ${token}`;
    let transformedRequest = req.clone({
      setHeaders: {
        authorization: bearerToken,
      },
    });
    return next.handle(transformedRequest);
  }
}
// attaches Bearer token to all outgoing requests, then passes request to error-interceptor
