import { ResultValue } from '../_shared/result-value';
import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { throwError, Observable } from 'rxjs';
import { retry, map, catchError, tap } from 'rxjs/operators';
import { environment } from '../../environments/environment';

import { Activity } from './activity';
import { ActivityRaw } from './activity-raw';
import { ActivityFactory } from './activity-factory';
import { PageParameter } from '../_shared/page-parameter';

@Injectable({
  providedIn: 'root'
})

export class ActivityStoreService {
  private api = environment.api;

  constructor(private http: HttpClient) {}

  getAll(): Observable<Activity[]> {
    return this.http.get<ActivityRaw[]>(`${this.api}/activity/all`)
      .pipe(
        retry(3),
        map(activityRaw => activityRaw.map(m => ActivityFactory.fromRaw(m)),
        ),
        catchError(this.errorHandler)
      );
  }

  getCount(filter: string ): Observable<ResultValue> {
    const parameter: PageParameter = new PageParameter();
    parameter.filter = filter;
    return this.http.put<ResultValue>(`${this.api}/activity/count/0`, parameter)
      .pipe(
        retry(3),
        catchError(this.errorHandler)
      );
  }

  getPage(filter: string, sortField: string, sortDirection: string, pageIndex: number, pagesize: number ): Observable<Activity[]> {
    const parameter: PageParameter = new PageParameter();
    parameter.filter = filter;
    parameter.sort = sortField;
    parameter.sortDirection =  sortDirection;
    parameter.pageSize = pagesize;
    parameter.pageStart = pageIndex * pagesize;

    return this.http.put<ActivityRaw[]>(`${this.api}/activity/filter/0`, parameter )
      .pipe(
        retry(3),
        map(activityRaw => activityRaw.map(m => ActivityFactory.fromRaw(m)),
        ),
        catchError(this.errorHandler)
      );
  }

  getSingle(id: number): Observable<Activity> {
    console.log('ID:', id);
    return this.http.get<ActivityRaw>(
      `${this.api}/activity/${id}`
    ).pipe(
      retry(3),
      map(m => ActivityFactory.fromRaw(m)),
      catchError(this.errorHandler)
    );
  }

  create(activity: ActivityRaw): Observable<any> {;
    return this.http.post(
      `${this.api}/activity`,
      activity,
      { responseType: 'text' }
    ).pipe(
      catchError(this.errorHandler)
    );
  }

  update(activity: ActivityRaw): Observable<any> {
    return this.http.put(
      `${this.api}/activity/${activity.Id}`,
      activity,
      { responseType: 'text' }
    ).pipe(
      catchError(this.errorHandler)
    );
  }

  remove(id: number): Observable<any> {
    return this.http.delete(
      `${this.api}/activity/${id}`,
      { responseType: 'text' }
    ).pipe(
      catchError(this.errorHandler)
    );
  }

  /*
  getAllSearch(searchTerm: string): Observable<Activity[]> {
    return this.http.get<ActivityRaw[]>(
      `${this.api}/activity/search/${searchTerm}`
    ).pipe(
      retry(3),
      map(activitysRaw =>
        activitysRaw.map(m => ActivityFactory.fromRaw(m)),
      ),
      catchError(this.errorHandler)
    );
  }
*/

  generateTributeValues( ): Observable<any> {
    console.log('generateTributeValues');
    return this.http.put(
      `${this.api}/activity//tribute/:dummy`,
      { responseType: 'text' }
    ).pipe(
      catchError(this.errorHandler)
    );
  }

  generateActiveState(year:string): Observable<any> {
    return this.http.put(
      `${this.api}/activity//allactive/${year}`,
      { responseType: 'text' }
    ).pipe(
      catchError(this.errorHandler)
    );
  }

  private errorHandler(error: HttpErrorResponse): Observable<any> {
    console.error('Es ist ein Fehler beim HTTP-Request aufgetreten!');
    return throwError(error);
  }
}
