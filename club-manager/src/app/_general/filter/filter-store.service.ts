import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { throwError, Observable } from 'rxjs';
import { retry, map, catchError, tap } from 'rxjs/operators';
import { environment } from '../../../environments/environment';

import { Filter } from './filter';
import { FilterRaw } from './filter-raw';
import { FilterFactory } from './filter-factory';


@Injectable({
  providedIn: 'root'
})

export class FilterStoreService {

  private api = environment.api;

  constructor(private http: HttpClient) {}

  // Holt alle Filter zu einer Tabelle
  getFilters(table: string): Observable<Filter[]> {
    return this.http.get<FilterRaw[]>(`${this.api}/filter/all/${table}`)
    .pipe(
      retry(3),
      map(filterRaw => filterRaw.map(f => FilterFactory.fromRaw(f)),
      ),
      catchError(this.errorHandler)
    );
  }


  private errorHandler(error: HttpErrorResponse): Observable<any> {
    console.error('FilterStoreService.ErrorHandler: Es ist ein Fehler mit der SystemFilter Daten aufgetreten!');
    return throwError(error);
  }

  private handleError(error: HttpErrorResponse) {
    let errorMessage = 'Unknown error!';
    if (error.error instanceof ErrorEvent) {
      // Client-side errors
      errorMessage = `Error: ${error.error.message}`;
    } else {
      // Server-side errors
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    window.alert(errorMessage);
    return throwError(errorMessage);
  }
}
