import { ResultValue } from './../../_shared/result-value';
import { tap } from 'rxjs/operators';
import { Component, ViewChild, OnInit, AfterViewInit, ElementRef, } from '@angular/core';
import { Observable, fromEvent, merge } from 'rxjs';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort, Sort } from '@angular/material/sort';
import { Member } from '../member';
import { MemberStoreService } from '../member-store.service';

@Component({
  selector: 'cl-member-list',
  templateUrl: './member-list.component.html',
  styleUrls: ['./member-list.component.scss']
})
export class MemberListComponent implements OnInit, AfterViewInit {

  members$: Observable<Member[]>;
  count$: Observable<ResultValue>;
  displayedColumns = ['familyname', 'firstname', 'street', 'zip', 'city'];
  memberCount = 0;
  pageCount = 0;
  loading = true;
  sortField = 'me_family_name';

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild('input') input: ElementRef;

  constructor(private mb: MemberStoreService) { }

  ngOnInit(): void {
    this.loading = true;
    this.count$ = this.mb.getCount('');
    this.count$.subscribe( result => {
      console.log(result);
      this.memberCount = result[0].resCount;
    });

    this.members$ = this.mb.getPage('', this.sortField, 'ASC', 0, 50);
    this.members$.subscribe( result => {
      this.pageCount = result.length;
      this.loading = false;
    });
  }

  ngAfterViewInit(): void {
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

  sortData(sort: Sort): void {
    if (!sort.active || sort.direction === '') {
      this.sortField = 'me_family_name';
      return;
    }
    console.log('sortDATA');
    switch (sort.active) {
      case 'familyname': {
        this.sortField = 'me_family_name';
        break;
      }
      case 'firstname': {
        this.sortField = 'me_first_name';
        break;
      }
      case 'street': {
        this.sortField = 'me_street';
        break;
      }
      case 'zip': {
        this.sortField = 'me_zip';
        break;
      }
      case 'city': {
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
  }

  countMemberPage(): any {
    this.count$ = this.mb.getCount(this.input.nativeElement.value);
    this.count$.subscribe( result => {
      console.log(result);
      this.memberCount = result[0].resCount;
    });
  }
}
