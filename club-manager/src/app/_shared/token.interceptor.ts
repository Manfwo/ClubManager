import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable } from 'rxjs';
import { TokenStorageService } from './token-storage.service';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {
  private authToken = '';

  constructor(private tokenStore: TokenStorageService ) {
    this.authToken = tokenStore.getToken();
  }

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    const newRequest = request.clone({
       setHeaders: {
        Authorization: `Bearer ${this.authToken}`,
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
      }
    });
    return next.handle(newRequest);
  }
}
