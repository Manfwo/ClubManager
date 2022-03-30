import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { TokenStorageService } from './token-storage.service';
import { CommonValues } from './common';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {
  private authToken = '';

  constructor(private tokenStore: TokenStorageService ) {
    //console.log('INTERCEPT_CONSTRUCTOR', this.authToken);
    this.authToken = tokenStore.getToken();
    if (this.authToken !== undefined) {
      CommonValues.isAuthenticated = true;
    }
  }

  intercept( request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
      console.log('INTERCEPT',request.url);
      this.authToken = this.tokenStore.getToken();
      if (this.authToken !== undefined) {
        CommonValues.isAuthenticated = true;
      }
      else {
        CommonValues.isAuthenticated = false;
      }
      //console.log('INTERCEPT', this.authToken);

      const newRequest = request.clone({setHeaders: {
          Authorization: `Bearer ${this.authToken}`,
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
        }
      });
      return next.handle(newRequest).pipe(
        tap(
          event => console.log('response success:', event),
          error => console.log('response error', error)
        )
      );
  }
}
