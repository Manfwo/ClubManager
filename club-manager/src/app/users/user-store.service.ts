import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { throwError, Observable } from 'rxjs';
import { retry, map, catchError, tap } from 'rxjs/operators';
import { environment } from '../../environments/environment';
import { JwtResponse } from '../general/jwt-response';

import { User } from './user';
import { UserRaw } from './user-raw';
import { UserFactory } from './user-factory';

@Injectable({
  providedIn: 'root'
})

export class UserStoreService {
  private api = environment.api;

  constructor(private http: HttpClient) {}

  getAll(): Observable<User[]> {
    return this.http.get<UserRaw[]>(`${this.api}/user/all`)
      .pipe(
        retry(3),
        map(userRaw =>
          userRaw.map(m => UserFactory.fromRaw(m)),
        ),
        catchError(this.errorHandler)
      );
  }

  getSingle(id: number): Observable<User> {
    console.log('ID:', id);
    return this.http.get<UserRaw>(
      `${this.api}/user/${id}`
    ).pipe(
      retry(3),
      map(m => UserFactory.fromRaw(m)),
      catchError(this.errorHandler)
    );
  }

  create(user: User): Observable<any> {
    return this.http.post(
      `${this.api}/user`,
      user,
      { responseType: 'text' }
    ).pipe(
      catchError(this.errorHandler)
    );
  }

  update(user: User): Observable<any> {
    return this.http.put(
      `${this.api}/user/${user.Id}`,
      user,
      { responseType: 'text' }
    ).pipe(
      catchError(this.errorHandler)
    );
  }

  remove(id: number): Observable<any> {
    return this.http.delete(
      `${this.api}/user/${id}`,
      { responseType: 'text' }
    ).pipe(
      catchError(this.errorHandler)
    );
  }

  login(user: User): Observable<JwtResponse> {
    //console.log('UserStoreService.Login.user', user);
    //console.log('UserStoreService.Login.api', this.api);
    return this.http.post<JwtResponse>(`${this.api}/user/login`, user).pipe(
      tap((res: JwtResponse ) => {

        if (res) {
          //console.log('UserStoreService.Login.accessToken', res.accessToken);
        }
      })
    );
  }

  private errorHandler(error: HttpErrorResponse): Observable<any> {
    console.error('UserStoreService.ErrorHandler: Es ist ein Fehler aufgetreten!');
    return throwError(error);
  }
}
