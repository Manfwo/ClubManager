import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { throwError, Observable } from 'rxjs';
import { retry, map, catchError } from 'rxjs/operators';
import { environment } from '../../environments/environment';

import { Member } from './member';
import { MemberRaw } from './member-raw';
import { MemberFactory } from './member-factory';

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
        map(memberRaw =>
          memberRaw.map(m => MemberFactory.fromRaw(m)),
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
    console.error('Fehler aufgetreten!');
    return throwError(error);
  }
}
