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

  // Partner Daten lesen
  getByMemberId(id: number ): Observable<Member[]> {
    return this.http.get<MemberRaw[]>(`${this.api}/member/${id}`)
      .pipe(
      retry(3),
      map(memberRaw => memberRaw.map(m => MemberFactory.fromRaw(m)),
      ),
      catchError(this.errorHandler)
    );
  }

    // Kinder zu Mitglied lesen
    getByChildrens(id: number ): Observable<Member[]> {
      return this.http.get<MemberRaw[]>(`${this.api}/member/children/${id}`)
        .pipe(
        retry(3),
        map(memberRaw => memberRaw.map(m => MemberFactory.fromRaw(m)),
        ),
        catchError(this.errorHandler)
      );
    }

  getCount(filter: string, resignList: string  ): Observable<ResultValue> {
    const parameter: PageParameter = new PageParameter();
    parameter.filter = filter;
    if (resignList == 'y')
      parameter.resign = 1;
    else
      parameter.resign = 0;

    return this.http.put<ResultValue>(`${this.api}/member/count/0`, parameter)
      .pipe(
        retry(3),
        catchError(this.errorHandler)
      );
  }

  getPage(filter: string, filterCondition: string, sortField: string, sortDirection: string, pageIndex: number, pagesize: number, resignList: string ): Observable<Member[]> {
    const parameter: PageParameter = new PageParameter();
    parameter.filter = filter;
    parameter.filterAdditional = filterCondition;
    parameter.sort = sortField;
    parameter.sortDirection =  sortDirection;
    parameter.pageSize = pagesize;
    parameter.pageStart = pageIndex * pagesize;
    //console.log("PARAMETER",parameter);

    if (resignList == 'y')
      parameter.resign = 1;
    else
      parameter.resign = 0;

    return this.http.put<MemberRaw[]>(`${this.api}/member/filter/0`, parameter )
    .pipe(
          retry(3),
          map(memberRaw => memberRaw.map(m => MemberFactory.fromRaw(m)),
          ),
          catchError(this.errorHandler)
    );
  }

  create(member: MemberRaw): Observable<any> {;
    return this.http.post(
      `${this.api}/member`,
      member,
      { responseType: 'text' }
    ).pipe(
      catchError(this.errorHandler)
    );
  }

  update(member: MemberRaw): Observable<any> {
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

  generateSingleAlias(id: number): Observable<any> {
    return this.http.put(
      `${this.api}/member/singlealias/${id}`,
      { responseType: 'text' }
    ).pipe(
      catchError(this.errorHandler)
    );
  }

  generateAlias(): Observable<any> {
    console.log('generateAlias');
    return this.http.put(
      `${this.api}/member/alias/0`,
      { responseType: 'text' }
    ).pipe(
      catchError(this.errorHandler)
    );
  }

  generateParentChilds(): Observable<any> {
    return this.http.put(
      `${this.api}/member/parent_childs/0`,
      { responseType: 'text' }
    ).pipe(
      catchError(this.errorHandler)
    );
  }

  calcSingleAge(birthday : string): Observable<any> {
    return this.http.put(
      `${this.api}/member/singleage/${birthday}`,
      { responseType: 'text' }
      ).pipe(
        catchError(this.errorHandler)
      );
  }

  calcAge(): Observable<any> {
    return this.http.put(
      `${this.api}/member/age/0`,
      { responseType: 'text' }
      ).pipe(
        catchError(this.errorHandler)
      );
  }

  generateMemberYears(): Observable<any> {
    return this.http.put(
      `${this.api}/member/memberyears/0`,
      { responseType: 'text' }
      ).pipe(
        catchError(this.errorHandler)
      );
  }

  private errorHandler(error: HttpErrorResponse): Observable<any> {
    console.error('Es ist ein Fehler beim HTTP-Request aufgetreten!',error);
    return throwError(error);
  }
}
