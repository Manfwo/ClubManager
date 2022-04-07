import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { throwError, Observable } from 'rxjs';
import { retry, map, catchError, tap } from 'rxjs/operators';
import { environment } from '../../../environments/environment';

import { History } from './history';
import { HistoryRaw } from './history-raw';
import { HistoryFactory } from './history-factory';


@Injectable({
  providedIn: 'root'
})

export class HistoryStoreService {
  private api = environment.api;

  constructor(private http: HttpClient) {}

  getAll(): Observable<History[]> {
    return this.http.get<HistoryRaw[]>(`${this.api}/history/all`)
      .pipe(
        retry(3),
        map(historyRaw => historyRaw.map(h => HistoryFactory.fromRaw(h)),
        ),
        catchError(this.errorHandler)
      );
  }


  getSingle(id: number): Observable<History> {
    console.log('ID:', id);
    return this.http.get<HistoryRaw>(
      `${this.api}/history/${id}`
    ).pipe(
      retry(3),
      map(h => HistoryFactory.fromRaw(h)),
      catchError(this.errorHandler)
    );
  }


  private errorHandler(error: HttpErrorResponse): Observable<any> {
    console.error('Es ist ein Fehler beim HTTP-Request aufgetreten!');
    return throwError(error);
  }
}
