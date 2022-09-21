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
import { Member } from '../members/member';
import { MemberRaw } from '../members/member-raw';
import { MemberFactory } from '../members/member-factory';

@Injectable({
  providedIn: 'root'
})

export class GroupStoreService {
  private api = environment.api;

  constructor(private http: HttpClient) {}

  // Ermittelt die Anzahl Gruppen
  // für Gruppenansicht
  getCount(filter1: string ): Observable<ResultValue> {
    const parameter: PageParameter = new PageParameter();
    parameter.filter = filter1;
    return this.http.put<ResultValue>(`${this.api}/group/count/0`, parameter)
      .pipe(
        retry(3),
        catchError(this.errorHandler)
      );
  }

  // Liesst die Gruppen unter Berücksichtigung des Filters und Paging
  // für Gruppenansicht
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

  // Ermittelt die Anzahl Gruppenmitglieder
  // für Gruppen Bearbeitung (Paging)
  getGroupMemCount(groupId: number): Observable<ResultValue> {
    const parameter: PageParameter = new PageParameter();
    return this.http.get<ResultValue>(`${this.api}/groupmember/count/${groupId}`)
      .pipe(
        retry(3),
        catchError(this.errorHandler)
      );
  }

  // Liesst die Gruppenmitglieder
  // für Gruppen Bearbeitung
  getGroupMemPage(groupId: number, sortField: string, sortDirection: string, pageIndex: number, pagesize: number ): Observable<Member[]> {
    const parameter: PageParameter = new PageParameter();
    parameter.sort = sortField;
    parameter.sortDirection =  sortDirection;
    parameter.pageSize = pagesize;
    parameter.pageStart = pageIndex * pagesize;

    return this.http.put<MemberRaw[]>(`${this.api}/groupmember/members/${groupId}`, parameter )
      .pipe(
        retry(3),
        map(memRaw => memRaw.map(m => MemberFactory.fromRaw(m)),
        ),
        catchError(this.errorHandler)
      );
  }

  // Legt eine neue Gruppe an
  create(group: GroupRaw): Observable<any> {;
    return this.http.post(
      `${this.api}/group`,
      group,
      { responseType: 'text' }
    ).pipe(
      catchError(this.errorHandler)
    );
  }

  // Aktualtisiert die Gruppendaten
  // für Gruppen Bearbeitung
  update(group: GroupRaw): Observable<any> {
    return this.http.put(
      `${this.api}/group/${group.Id}`,
      group,
      { responseType: 'text' }
    ).pipe(
      catchError(this.errorHandler)
    );
  }

  // Löscht eine Gruppe
  // für Gruppen Bearbeitung
  remove(id: number): Observable<any> {
    return this.http.delete(
      `${this.api}/groupmember/${id}`,
      { responseType: 'text' }
    ).pipe(
      catchError(this.errorHandler)
    );
  }

  // Löscht die Mitglieder einer Gruppe
  // für Gruppen Bearbeitung
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
