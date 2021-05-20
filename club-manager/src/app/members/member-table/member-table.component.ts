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
export class MemberTableComponent implements OnInit, OnChanges, AfterViewInit{

  loading = true;           // Kennungn für Spinner

  // Suche
  @Input() filter: string;

  // Pagination
  @ViewChild(MatPaginator) paginator: MatPaginator;
  pageTotalCount = 0;
  pageCount = 50;

  // Sortierung
  @ViewChild(MatSort) sort: MatSort;
  sortField = 'me_family_name';
  sortActive = '';
  sortDirection = 'ASC';

  // Tabellen Daten
  displayedColumns: any[] = [];
  displayedColumnNames: string[] = [];
  members$: Observable<Member[]>;
  count$: Observable<ResultValue>;

  constructor(private mb: MemberStoreService, private localStore: LocalStorageService,  private renderer: Renderer2) {}

  ngOnInit(): void {
    // lade Einstellungen
    this.filter = this.localStore.get('memberFilter');
    this.sortDirection = this.localStore.get('memberSortDirection');
    this.sortField = this.localStore.get('memberSortFieldDb'),
    this.pageCount = this.localStore.get('memberPageSize');
    console.log('MemberTable.OnInit.filter:', this.filter);
    console.log('MemberTable.OnInit.sortDirection:', this.sortDirection);

    this.initTableColumns();

    this.loading = true;
    this.members$ = this.mb.getPage(this.filter, this.sortField, this.sortDirection, 0, this.pageCount);
    this.members$.subscribe( result => {
      this.pageCount = result.length;
      this.loading = false;
    });
  }

  ngAfterViewInit(): void {
    // wegen ExpressionChangedAfterItHasBeenCheckedError
    setTimeout(() => {
      this.sortActive = this.sortField;
      this.sort.direction = this.localStore.get('memberSortDirection');
      this.sortActive = this.localStore.get('memberSortField');
      this.paginator.pageSize = this.localStore.get('memberPageSize');
    });

    // reset the paginator after sorting
    this.sort.sortChange.subscribe(() => this.paginator.pageIndex = 0);

    // on sort or paginate events, load a new page
    merge(this.sort.sortChange, this.paginator.page)
    .pipe(
        tap(() => this.loadMemberPage())
    )
    .subscribe();
    // this.setTableResize(this.matTableRef.nativeElement.clientWidth);
  }

    // *** Suche
  ngOnChanges(changes: SimpleChanges): void {
    if (this.loading === false) {
      if (changes.filter) {
        if (this.filter !== undefined) {
          console.log('MemberTable.OnChanges.filter:', this.filter);
          this.loadMemberPage();
        }
      }
    }
  }

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
    this.members$ = this.mb.getPage(this.filter, this.sortField, this.sortDirection, this.paginator.pageIndex, this.paginator.pageSize);
    // save Settings
    this.localStore.set('memberSortField', this.sortActive);
    this.localStore.set('memberSortFieldDb', this.sortField);
    this.localStore.set('memberSortDirection', this.sort.direction);
    this.localStore.set('memberPageSize', this.paginator.pageSize);
  }

  private countMemberPage(): any {
    this.count$ = this.mb.getCount(this.filter);
    this.count$.subscribe( result => {
      this.pageTotalCount = result[0].resCount;
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
    this.setDisplayedColumns();
  }

  setDisplayedColumns(): void {
    this.displayedColumns.forEach(( column, index) => {
      this.displayedColumnNames[index] = column.field;
    });
    console.log('MemberTable.SetDisplayColumns.Lenth', this.displayedColumnNames.length);
  }
}