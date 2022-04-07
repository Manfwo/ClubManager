import { Component, Input, ViewChild, OnInit, AfterViewInit, DoCheck, } from '@angular/core';
import { CdkDragStart, CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort, Sort } from '@angular/material/sort';
import { MatPaginatorIntl } from '@angular/material/paginator';
import { Observable, merge } from 'rxjs';
import { tap } from 'rxjs/operators';
import { LocalStorageService } from './../../_shared/local-storage.service';
import { ResultValue } from './../../_shared/result-value';
import { CustomPaginator } from './../../_shared/custom-paginator';
import { Member } from '../member';
import { MemberStoreService } from '../member-store.service';
import { MemberSearchService } from '../member-search.service';
import { MemberTransferService } from '../member-transfer.service';
import { MemberColumnService } from '../member-column.service';
import { FieldStoreService } from '../../_general/field/field-store.service';
import { HeaderService } from 'src/app/app-header.service';
import { Field } from '../../_general/field/field';
import { Router } from '@angular/router';

@Component({
  selector: 'cl-member-table',
  templateUrl: './member-table.component.html',
  styleUrls: ['./member-table.component.scss'],
  providers: [
    { provide: MatPaginatorIntl, useValue: CustomPaginator('Mitglieder pro Seite') }
  ]
})

export class MemberTableComponent implements OnInit, DoCheck, AfterViewInit{

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

  // Spaltenreihenfolge
  bodyElement: HTMLElement = document.body;

  // Tabellen Daten
  displayedColumns: any[] = [];
  displayedColumnNames: string[] = [];
  members$: Observable<Member[]>;
  count$: Observable<ResultValue>;
  searchText: string;
  searchTextOld: string;
  fields$: Observable<Field[]>;
  fieldsSelectedOld: Field[] = [];
  fieldsSelected: Field[] = [];

  constructor(
    private router: Router,
    private mb: MemberStoreService,
    private localStore: LocalStorageService,
    private ms: MemberSearchService,
    private mc: MemberColumnService,
    private hs: HeaderService,
    private mt: MemberTransferService,
    private sf:FieldStoreService) {}

  ngOnInit(): void {
    // Suchtext from Header
    this.ms.sharedMessage.subscribe(message => this.searchText = message)

    // Spalten von Spaltenauswahl
    this.mc.sharedMessage.subscribe(list => this.fieldsSelected = list)

    // gespeicherte Einstellungen speichern
    this.filter = "" //this.localStore.get('memberFilter');
    this.sortDirection = this.localStore.get('memberSortDirection');
    this.sortField = this.localStore.get('memberSortFieldDb'),
    this.pageCount = this.localStore.get('memberPageSize');
    //console.log('MemberTable.OnInit.filter:', this.filter);
    //console.log('MemberTable.OnInit.sortDirection:', this.sortDirection);

    this.initTableColumns();

    this.loading = true;
    this.count$ = this.mb.getCount('');
    this.count$.subscribe( result => {
      this.pageTotalCount = result[0].resCount;
    });
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
  }

  // *** Suche
  ngDoCheck(): void {
    if (this.loading === false) {
      let change = false;
      // Änderung des Suchtextes
      if (this.searchTextOld != this.searchText) {
        this.searchTextOld = this.searchText;
        this.filter = this.searchText;
        //console.log('SearchText:', this.searchText);
        change = true;
      }

      // Spalten Änderung
      if ((this.fieldsSelected !== null) && (this.fieldsSelected.length > 0)
          && (this.fieldsSelected !== this.fieldsSelectedOld)) {
        this.fieldsSelectedOld = this.fieldsSelected;
        this.displayedColumnNames = [];
        this.displayedColumns = [];
        this.fieldsSelected.forEach(( col, index) => {
          this.displayedColumnNames[index] = col.Name;
          //console.log('newfield', col.Label, col.Width);
          this.displayedColumns[index] = col;
          change = true;
        })
      }

      // Seite neu laden
      if (change == true)
        this.loadMemberPage();
    }
  }

  // *** Sortierung
  sortData(sort: Sort): void {
    if (!sort.active || sort.direction === '') {
      this.sortField = 'me_family_name';
      return;
    }
    this.sortActive = sort.active;
    this.sortDirection = sort.direction;
    this.displayedColumns.forEach(item => {
      if (sort.active === item.field) {
        this.sortField = item.db;
      }
    });
    this.loadMemberPage();
  }

  // *** Spaltenreihenfolge per Drag & Drop ändern
  dragStarted(event: CdkDragStart): void  {
    //console.log('MemberTable.DragStarted.event', event );
    // this.bodyElement.classList.add('inheritCursors');
    this.bodyElement.style.cursor = 'move';
  }

  dropListDropped(event: CdkDragDrop<any[]>): void  {
    console.log('MemberTable.DropListDropped', event);
    if (event) {
      moveItemInArray(this.displayedColumns, event.previousIndex, event.currentIndex);
      moveItemInArray(this.displayedColumnNames, event.previousIndex, event.currentIndex);
      // this.bodyElement.classList.remove('inheritCursors');
      this.bodyElement.style.cursor = 'unset';
      this.loadMemberPage();
    }
  }

  editMember($event:Member) {
    console.log("EDI_MEMBER",$event);
    this.hs.nextMessage(12);
    this.mt.nextMessage($event);
    this.router.navigate( ['mem-update']);
  }

  // *** Daten ermitteln
  private loadMemberPage(): any {
    this.countMemberPage();
    this.members$ = this.mb.getPage(this.filter, this.sortField, this.sortDirection, this.paginator.pageIndex, this.paginator.pageSize);

    // save Settings
    this.localStore.set('memberSortField', this.sortActive);
    this.localStore.set('memberSortFieldDb', this.sortField);
    this.localStore.set('memberSortDirection', this.sortDirection);
    this.localStore.set('memberPageSize', this.paginator.pageSize);
    this.localStore.set('memberFilter', this.filter);
  }

  private countMemberPage(): any {
    this.count$ = this.mb.getCount(this.filter);
    this.count$.subscribe( result => {
      this.pageTotalCount = result[0].resCount;
    });
  }

  // *** Init Tabellenkopf
  private initTableColumns(): void {
    // sichtbare Spalten lesen
    this.fields$ =  this.sf.getTableVisibleUserFields('members');

    // In arrays konvertieren
    this.fields$.subscribe( result => {
      let pageCount = result.length;

      result.forEach(( col: Field, index: number) => {
        this.displayedColumnNames[index] = col.Name;
        this.displayedColumns[index] = col;
      });
    });
  }
}
