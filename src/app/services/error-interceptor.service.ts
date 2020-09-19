import {
  HttpErrorResponse,
  HttpEventType,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { throwError } from 'rxjs/internal/observable/throwError';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class ErrorInterceptorService implements HttpInterceptor {
  intercept(req: HttpRequest<any>, next: HttpHandler) {
    return next.handle(req).pipe(
      catchError((error) => {
        window.alert(error.message); // TODO: handle common http errors here
        return throwError(error);
      })
    );
  }
}
// catches HttpErrorResponse type responses (catchError), act, then forward error (throwError) to next-in-line (service --> component)
//
// component <-- service <-- this error-interceptor <-- HTTP (error) response
