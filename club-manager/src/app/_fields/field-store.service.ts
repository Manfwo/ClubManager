import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { throwError, Observable } from 'rxjs';
import { retry, map, catchError, tap } from 'rxjs/operators';
import { environment } from '../../environments/environment';

import { Field } from './field';
import { FieldRaw } from './field-raw';
import { FieldFactory } from './field-factory';

@Injectable({
  providedIn: 'root'
})

export class FieldStoreService {

  private api = environment.api;

  constructor(private http: HttpClient) {}

  getTableFields(table: string): Observable<Field[]> {
    return this.http.get<FieldRaw[]>(`${this.api}/field/table/${table}`)
    .pipe(
      retry(3),
      map(fieldRaw =>
        fieldRaw.map(m => FieldFactory.fromRaw(m)),
      ),
      catchError(this.errorHandler)
    );
  }

  getTableVisibleFields(table: string): Observable<Field[]> {
    return this.http.get<FieldRaw[]>(`${this.api}/field/tablevisible/${table}`)
    .pipe(
      retry(3),
      map(fieldRaw =>
        fieldRaw.map(m => FieldFactory.fromRaw(m)),
      ),
      catchError(this.errorHandler)
    );
  }

  updateVisible(id: number, state: number): Observable<any> {
    let field = new FieldRaw;
    field.Id = id;
    field.Visible = state;
    console.log("UpdateVisible",id, state);

    return this.http.put(`${this.api}/field/visible/`+id,field, { responseType: 'text' }
    ).pipe(
      retry(3),
      catchError(this.errorHandler)
    );
  }

  resetVisible( table: string) {
    let errorMessage = "";
    try {
     this.http.put(
        `${this.api}/field/tablevreset/${table}`,
        { responseType: 'text' }
      ).pipe(
       // catchError(this.handleError)
      );

      } catch (error) {
        console.log("ERROR: ",error);
      }
  }

  private errorHandler(error: HttpErrorResponse): Observable<any> {
    console.error('FieldStoreService.ErrorHandler: Es ist ein Fehler mit der SystemField Daten aufgetreten!');
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
