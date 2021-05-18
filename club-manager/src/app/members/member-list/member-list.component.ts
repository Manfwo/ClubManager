import { Component, ViewChild, ViewChildren, QueryList, OnInit, AfterViewInit, OnChanges, ElementRef, HostListener, Renderer2 } from '@angular/core';
import { CdkDragStart, CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';

import { MatPaginator } from '@angular/material/paginator';
import { MatSort, Sort } from '@angular/material/sort';
import { MatPaginatorIntl } from '@angular/material/paginator';
import { MatTable } from '@angular/material/table';
import { SplitComponent, SplitAreaDirective } from 'angular-split';

import { tap } from 'rxjs/operators';
import { Observable, fromEvent, merge } from 'rxjs';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';

import { LocalStorageService } from './../../_shared/local-storage.service';
import { ResultValue } from './../../_shared/result-value';
import { CustomPaginator } from './../../_shared/custom-paginator';
import { Member } from '../member';
import { MemberStoreService } from '../member-store.service';
@Component({
  selector: 'cl-member-list',
  templateUrl: './member-list.component.html',
  styleUrls: ['./member-list.component.scss']
})
export class MemberListComponent implements OnInit, AfterViewInit, OnChanges {

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild('input') input: ElementRef;
  @ViewChild(SplitComponent) splitEl: SplitComponent;
  @ViewChildren(SplitAreaDirective) areasEl: QueryList<SplitAreaDirective>;


  members$: Observable<Member[]>;
  count$: Observable<ResultValue>;
  displayedColumns = ['Familyname', 'Firstname', 'Street', 'Zipcode', 'City'];
  displayedColumnNames = new Array();
  memberCount = 0;
  pageCount = 0;
  loading = true;
  sortField = 'me_family_name';
  sortActive = '';

  constructor(private mb: MemberStoreService, private localStore: LocalStorageService) { }

  ngOnInit(): void {
    this.displayedColumnNames['Familyname'] = 'Nachname';
    this.displayedColumnNames['Firstname'] = 'Vorname';
    this.displayedColumnNames['Street'] = 'Straße';
    this.displayedColumnNames['Zipcode'] = 'PLZ';
    this.displayedColumnNames['City'] = 'Ort';
    this.loading = true;
    this.count$ = this.mb.getCount('');
    this.count$.subscribe( result => {
      console.log(result);
      this.memberCount = result[0].resCount;
    });

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
    console.log('AFTERVIEWINIT: ', this.areasEl);
    this.areasEl.last.visible = false;
    // this.areasEl.last.collapse(0, 'left');
    // this.areasEl.first.collapse(101);

    // wegen ExpressionChangedAfterItHasBeenCheckedError
    setTimeout(() => {

      this.input.nativeElement.value = this.localStore.get('memberFilter');
      this.sortActive = this.localStore.get('memberSortField');
      this.sort.direction = this.localStore.get('memberSortDirection');
      this.paginator.pageSize = this.localStore.get('memberPageSize');
      });

    // server-side search
    fromEvent(this.input.nativeElement, 'keyup')
    .pipe(
        debounceTime(150),
        distinctUntilChanged(),
        tap(() => {
            this.paginator.pageIndex = 0;
            this.loadMemberPage();
        })
    )
    .subscribe();

    // reset the paginator after sorting
    this.sort.sortChange.subscribe(() => this.paginator.pageIndex = 0);

    // on sort or paginate events, load a new page
    merge(this.sort.sortChange, this.paginator.page)
    .pipe(
        tap(() => this.loadMemberPage())
    )
    .subscribe();
  }

  ngOnChanges(): void {
    this.input.nativeElement.value = this.localStore.get('memberFilter');
    this.sortActive = this.localStore.get('memberSortField');
    this.sort.direction = this.localStore.get('memberSortDirection');
    this.paginator.pageSize = this.localStore.get('memberPageSize');
  }

  sortData(sort: Sort): void {
    if (!sort.active || sort.direction === '') {
      this.sortField = 'me_family_name';
      return;
    }
    console.log('sortDATA');
    this.sortActive = sort.active;
    switch (sort.active) {
      case 'Familyname': {
        this.sortField = 'me_family_name';
        break;
      }
      case 'Firstname': {
        this.sortField = 'me_first_name';
        break;
      }
      case 'Street': {
        this.sortField = 'me_street';
        break;
      }
      case 'Zipcode': {
        this.sortField = 'me_zip';
        break;
      }
      case 'City': {
        this.sortField = 'me_city';
        break;
      }
      default: this.sortField = 'me_family_name';
    }
    this.loadMemberPage();
  }

  loadMemberPage(): any {
    this.countMemberPage();
    this.members$ = this.mb.getPage(
      this.input.nativeElement.value,
      this.sortField,
      this.sort.direction,
      this.paginator.pageIndex,
      this.paginator.pageSize);
    // save Settings
    this.localStore.set('memberFilter', this.input.nativeElement.value);
    this.localStore.set('memberSortField', this.sortActive);
    this.localStore.set('memberSortFieldDb', this.sortField);
    this.localStore.set('memberSortDirection', this.sort.direction);
    this.localStore.set('memberPageSize', this.paginator.pageSize);
  }

  countMemberPage(): any {
    this.count$ = this.mb.getCount(this.input.nativeElement.value);
    this.count$.subscribe( result => {
      console.log(result);
      this.memberCount = result[0].resCount;
    });
  }
}
