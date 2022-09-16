import { ResultValue } from '../_shared/result-value';
import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { throwError, Observable } from 'rxjs';
import { retry, map, catchError, tap } from 'rxjs/operators';
import { environment } from '../../environments/environment';
import { PageParameter } from '../_shared/page-parameter';
import { Group } from './group';
import { GroupRaw } from './group-raw';
import { GroupFactory } from './group-factory';

@Injectable({
  providedIn: 'root'
})

export class GroupStoreService {
  private api = environment.api;

  constructor(private http: HttpClient) {}

  getCount(filter1: string ): Observable<ResultValue> {
    const parameter: PageParameter = new PageParameter();
    parameter.filter = filter1;
    return this.http.put<ResultValue>(`${this.api}/group/count/0`, parameter)
      .pipe(
        retry(3),
        catchError(this.errorHandler)
      );
  }

  getPage(filter: string, sortField: string, sortDirection: string, pageIndex: number, pagesize: number ): Observable<Group[]> {
    const parameter: PageParameter = new PageParameter();
    parameter.filter = filter;
    parameter.sort = sortField;
    parameter.sortDirection =  sortDirection;
    parameter.pageSize = pagesize;
    parameter.pageStart = pageIndex * pagesize;

    return this.http.put<GroupRaw[]>(`${this.api}/group/filter/0`, parameter )
      .pipe(
        retry(3),
        map(groupRaw => groupRaw.map(m => GroupFactory.fromRaw(m)),
        ),
        catchError(this.errorHandler)
      );
  }

  create(group: GroupRaw): Observable<any> {;
    return this.http.post(
      `${this.api}/group`,
      group,
      { responseType: 'text' }
    ).pipe(
      catchError(this.errorHandler)
    );
  }

  update(group: GroupRaw): Observable<any> {
    return this.http.put(
      `${this.api}/group/${group.Id}`,
      group,
      { responseType: 'text' }
    ).pipe(
      catchError(this.errorHandler)
    );
  }

  remove(id: number): Observable<any> {
    return this.http.delete(
      `${this.api}/group/${id}`,
      { responseType: 'text' }
    ).pipe(
      catchError(this.errorHandler)
    );
  }

  removeMember(id: number): Observable<any> {
    return this.http.delete(
      `${this.api}/group/member/${id}`,
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
