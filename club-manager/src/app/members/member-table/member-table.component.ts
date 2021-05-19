import { Component, Input, ViewChild, SimpleChanges,
  ViewChildren, OnInit, AfterViewInit, OnChanges, HostListener, Renderer2 } from '@angular/core';
import { CdkDragStart, CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';

import { MatPaginator } from '@angular/material/paginator';
import { MatSort, Sort } from '@angular/material/sort';
import { MatPaginatorIntl } from '@angular/material/paginator';
import { MatTable } from '@angular/material/table';

import { Observable, fromEvent, merge } from 'rxjs';
import { tap } from 'rxjs/operators';

import { LocalStorageService } from './../../_shared/local-storage.service';
import { ResultValue } from './../../_shared/result-value';
import { CustomPaginator } from './../../_shared/custom-paginator';
import { Member } from '../member';
import { MemberStoreService } from '../member-store.service';

@Component({
  selector: 'cl-member-table',
  templateUrl: './member-table.component.html',
  styleUrls: ['./member-table.component.scss'],
  providers: [
    { provide: MatPaginatorIntl, useValue: CustomPaginator('Mitglieder pro Seite') }
  ]
})
export class MemberTableComponent implements OnInit, AfterViewInit, OnChanges {

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  @Input() filter: string;

  members$: Observable<Member[]>;
  count$: Observable<ResultValue>;
  displayedColumns: any[] = [];
  displayedColumnNames: string[] = [];

  memberCount = 0;
  pageCount = 0;
  loading = true;
  sortField = 'me_family_name';
  sortActive = '';

  constructor(private mb: MemberStoreService, private localStore: LocalStorageService,  private renderer: Renderer2) {}

  ngOnInit(): void {
    this.initTableColumns();
    this.loading = true;

    this.count$ = this.mb.getCount('');
    this.count$.subscribe( result => {
      console.log(result);
      this.memberCount = result[0].resCount;
    });
    console.log('Member.OnInit.filter:', this.localStore.get('memberFilter'));
    this.members$ = this.mb.getPage(
      this.localStore.get('memberFilter'),
      this.localStore.get('memberSortFieldDb'),
      this.localStore.get('memberSortDirection'),
      0,
      this.localStore.get('memberPageSize'));
    this.members$.subscribe( result => {
      this.pageCount = result.length;
      this.loading = false;
    });
  }

  ngAfterViewInit(): void {
    // wegen ExpressionChangedAfterItHasBeenCheckedError
    setTimeout(() => {
      this.sortActive = this.localStore.get('memberSortField');
      this.sort.direction = this.localStore.get('memberSortDirection');
      this.paginator.pageSize = this.localStore.get('memberPageSize');
      });
  }

    // *** für Suche
    ngOnChanges(changes: SimpleChanges): void {

      if (changes.filter) {
        if (this.filter !== undefined) {
         console.log('filter:', this.filter);
         this.loadMemberPage();
        }
      }
    }

  /*
  ngOnChanges(): void {
    console.log('ONCHANGES');
    this.sortActive = this.localStore.get('memberSortField');
    this.sort.direction = this.localStore.get('memberSortDirection');
    this.paginator.pageSize = this.localStore.get('memberPageSize');
  }
*/

  // *** Sortierung
  sortData(sort: Sort): void {
    if (!sort.active || sort.direction === '') {
      this.sortField = 'me_family_name';
      return;
    }
    this.sortActive = sort.active;
    this.displayedColumns.forEach(item => {
      if (sort.active === item.field) {
        this.sortField = item.db;
      }
    });
    this.loadMemberPage();
  }

  // *** Daten ermitteln
  private loadMemberPage(): any {
    this.countMemberPage();
    this.members$ = this.mb.getPage(this.filter, this.sortField, this.sort.direction, this.paginator.pageIndex, this.paginator.pageSize);
    // save Settings
    this.localStore.set('memberSortField', this.sortActive);
    this.localStore.set('memberSortFieldDb', this.sortField);
    this.localStore.set('memberSortDirection', this.sort.direction);
    this.localStore.set('memberPageSize', this.paginator.pageSize);
  }

  private countMemberPage(): any {
    this.count$ = this.mb.getCount(this.filter);
    this.count$.subscribe( result => {
      // console.log(result);
      this.memberCount = result[0].resCount;
    });
  }

  // *** Init Tabellenkopf
  private initTableColumns(): void {
    this.displayedColumns = [
      {field: 'Familyname', name: 'Nachname', width: 200, db: 'me_family_name' },
      {field: 'Firstname', name: 'Vorname', width: 200, db: 'me_first_name' },
      {field: 'Street', name: 'Straße', width: 200, db: 'me_street' },
      {field: 'Zipcode', name: 'PLZ', width: 200, db: 'me_zip' },
      {field: 'City', name: 'Ort', width: 200, db: 'me_city' }
    ];
    console.log('INITTABLECOL', this.displayedColumns[0].field);
    this.setDisplayedColumns();
  }

  setDisplayedColumns(): void {
    this.displayedColumns.forEach(( column, index) => {
      this.displayedColumnNames[index] = column.field;
    });
  }
}
