import { ResultValue } from './../_shared/result-value';
import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { throwError, Observable } from 'rxjs';
import { retry, map, catchError, tap } from 'rxjs/operators';
import { environment } from '../../environments/environment';

import { Member } from './member';
import { MemberRaw } from './member-raw';
import { MemberFactory } from './member-factory';
import { PageParameter } from '../_shared/page-parameter';

@Injectable({
  providedIn: 'root'
})

export class MemberStoreService {
  private api = environment.api;

  constructor(private http: HttpClient) {}

  getAll(): Observable<Member[]> {
    return this.http.get<MemberRaw[]>(`${this.api}/member/all`)
      .pipe(
        retry(3),
        map(memberRaw => memberRaw.map(m => MemberFactory.fromRaw(m)),
        ),
        catchError(this.errorHandler)
      );
  }
  getCount(filter: string ): Observable<ResultValue> {
    const parameter: PageParameter = new PageParameter();
    parameter.filter = filter;
    return this.http.put<ResultValue>(`${this.api}/member/count/0`, parameter)
      .pipe(
        retry(3),
        catchError(this.errorHandler)
      );
  }

  getPage(filter: string, sortField: string, sortDirection: string, pageIndex: number, pagesize: number ): Observable<Member[]> {
    const parameter: PageParameter = new PageParameter();
    parameter.filter = filter;
    parameter.sort = sortField;
    parameter.sortDirection =  sortDirection;
    parameter.pageSize = pagesize;
    parameter.pageStart = pageIndex * pagesize;

    return this.http.put<MemberRaw[]>(`${this.api}/member/filter/0`, parameter )
      .pipe(
        retry(3),
        map(memberRaw => memberRaw.map(m => MemberFactory.fromRaw(m)),
        ),
        catchError(this.errorHandler)
      );
  }

  getSingle(id: number): Observable<Member> {
    console.log('ID:', id);
    return this.http.get<MemberRaw>(
      `${this.api}/member/${id}`
    ).pipe(
      retry(3),
      map(m => MemberFactory.fromRaw(m)),
      catchError(this.errorHandler)
    );
  }

  create(member: Member): Observable<any> {
    return this.http.post(
      `${this.api}/member`,
      member,
      { responseType: 'text' }
    ).pipe(
      catchError(this.errorHandler)
    );
  }

  update(member: Member): Observable<any> {
    return this.http.put(
      `${this.api}/member/${member.Id}`,
      member,
      { responseType: 'text' }
    ).pipe(
      catchError(this.errorHandler)
    );
  }

  remove(id: number): Observable<any> {
    return this.http.delete(
      `${this.api}/member/${id}`,
      { responseType: 'text' }
    ).pipe(
      catchError(this.errorHandler)
    );
  }

  getAllSearch(searchTerm: string): Observable<Member[]> {
    return this.http.get<MemberRaw[]>(
      `${this.api}/member/search/${searchTerm}`
    ).pipe(
      retry(3),
      map(membersRaw =>
        membersRaw.map(m => MemberFactory.fromRaw(m)),
      ),
      catchError(this.errorHandler)
    );
  }

  check(isbn: string): Observable<boolean> {
    return this.http.get(
      `${this.api}/member/${isbn}/check`
    ).pipe(
      catchError(this.errorHandler)
    );
  }

  private errorHandler(error: HttpErrorResponse): Observable<any> {
    console.error('Es ist ein Fehler beim HTTP-Request aufgetreten!');
    return throwError(error);
  }
}
