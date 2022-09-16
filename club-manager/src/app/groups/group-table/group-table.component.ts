import { CdkDragDrop, CdkDragStart, moveItemInArray } from '@angular/cdk/drag-drop';
import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { MatSort, Sort } from '@angular/material/sort';
import { Router } from '@angular/router';
import { merge, Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { HeaderService } from 'src/app/app-header.service';
import { SidebarService } from 'src/app/app-sidebar.service';
import { Field } from 'src/app/_general/field/field';
import { FieldStoreService } from 'src/app/_general/field/field-store.service';
import { LocalStorageService } from 'src/app/_shared/local-storage.service';
import { PageParameter } from 'src/app/_shared/page-parameter';
import { PageParameterService } from 'src/app/_shared/page-parameter.service';
import { ResultValue } from 'src/app/_shared/result-value';
import { Group } from '../group';
import { GroupColumnService } from '../group-column.service';
import { GroupSearchService } from '../group-search.service';
import { GroupStoreService } from '../group-store.service';
import { GroupTransferService } from '../group-transfer.service';

@Component({
  selector: 'cl-group-table',
  templateUrl: './group-table.component.html',
  styleUrls: ['./group-table.component.scss']
})

export class GroupTableComponent implements OnInit {

  loading = true;           // Kennungn für Spinner

  // Suche
  @Input() search: string;
  searchText: string;
  searchTextOld: string;

  // Pagination
  page: PageParameter;

  // Sortierung
  @ViewChild(MatSort) sort: MatSort;
  sortField = 'gr_name';
  sortActive = '';
  sortDirection = 'ASC';

  // Spaltenreihenfolge
  bodyElement: HTMLElement = document.body;

  // Tabellen Daten
  groups$: Observable<Group[]>;
  count$: Observable<ResultValue>;

  // Tabellenspalten
  displayedColumns: any[] = [];
  displayedColumnNames: string[] = [];
  fields$: Observable<Field[]>;
  fieldsSelectedOld: Field[] = [];
  fieldsSelected: Field[] = [];

  constructor(
    private router: Router,
    private localStore: LocalStorageService,
    private storeService: GroupStoreService,
    private searchService: GroupSearchService,
    private columnService: GroupColumnService,
    private headerService: HeaderService,
    private transferService: GroupTransferService,
    private pageService: PageParameterService,
    private fieldService: FieldStoreService,
    private sidebarService: SidebarService) {}

  ngOnInit(): void {
    console.log("GROUPCOMPONENT");
    // close Sidebar
    this.sidebarService.nextMessage(false);

    // Suchtext from Header
    this.searchService.sharedMessage.subscribe(message => this.searchText = message)

    // Spalten von Spaltenauswahl
    this.columnService.sharedMessage.subscribe(list => this.fieldsSelected = list)

    // gespeicherte Einstellungen lesen
    this.search = this.localStore.get('groupSearch');
    this.sortDirection = this.localStore.get('groupSortDirection');
    this.sortField = this.localStore.get('groupSortFieldDb'),

    // Paginator
    this.pageService.sharedPageParameter.subscribe(value => {this.page = value;
      this.loadGroupPage();
    });

    // Init Table
    this.initTableColumns();

    this.loading = true;
    this.groups$ = this.storeService.getPage(this.search, this.sortField, this.sortDirection, 0, this.localStore.get('groupPageSize'));
    this.groups$.subscribe( result => {
      this.loading = false;
    });
  }

  ngAfterViewInit(): void {
    setTimeout(() => {
      this.sortActive = this.sortField;
      this.sort.direction = this.localStore.get('groupSortDirection');
      this.sortActive = this.localStore.get('groupSortField');
    });

    // reset the paginator after sorting
    this.sort.sortChange.subscribe(() => this.page.pageIndex = 0);

    // on sort or paginate events, load a new page
    merge(this.sort.sortChange, this.page.pageIndex)
    .pipe(
      tap(() => this.loadGroupPage())
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
          this.search = this.searchText;
          change = true;
      }

      // Seite neu laden
      if (change == true) {
        this.loadGroupPage();
      }
    }
  }

  // *** Sortierung
  sortData(sort: Sort): void {
    if (!sort.active || sort.direction === '') {
      this.sortField = 'gr_name';
      return;
    }

    this.sortActive = sort.active;
    this.sortDirection = sort.direction;
    this.displayedColumns.forEach(item => {
      if (sort.active == item.Name) {
        this.sortField = item.Column;
        this.loadGroupPage();
      }
    });
  }

  // *** Spaltenreihenfolge per Drag & Drop ändern
  dragStarted(event: CdkDragStart): void  {
    this.bodyElement.style.cursor = 'move';
  }

  dropListDropped(event: CdkDragDrop<any[]>): void  {
    if (event) {
      moveItemInArray(this.displayedColumns, event.previousIndex, event.currentIndex);
      moveItemInArray(this.displayedColumnNames, event.previousIndex, event.currentIndex);
      this.bodyElement.style.cursor = 'unset';
      this.loadGroupPage();
    }
  }

  editGroup($event:Group) {
    this.headerService.nextMessage(16);
    this.transferService.nextMessage($event);
    this.router.navigate( ['grp-update']);
  }

  // *** Daten ermitteln
  private loadGroupPage(): any {
    if (!this.loading) {
      this.countGroupPage();
      this.groups$ = this.storeService.getPage(this.search,this.sortField, this.sortDirection, this.page.pageIndex, this.page.pageSize);
      this.groups$.subscribe(result => {
        if (this.sortActive === null) this.sortActive = '';
        if (this.sortField === null)  this.sortField = 'gr_name';
        if (this.sortDirection === null) this.sortDirection = 'ASC';
        if (this.search === null) this.search = '';
        this.localStore.set('groupSortField', this.sortActive);
        this.localStore.set('groupSortFieldDb', this.sortField);
        this.localStore.set('groupSortDirection', this.sortDirection);
        this.localStore.set('groupPageSize', this.page.pageSize);
        this.localStore.set('groupSearch', this.search);
      } )
    }
  }

  private countGroupPage(): any {
    this.count$ = this.storeService.getCount(this.search);
    this.count$.subscribe( result => {
      this.page.pageLength = result[0].resCount;
    });
  }

  // *** Init Tabellenkopf
  private initTableColumns(): void {
    // sichtbare Spalten lesen
    this.fields$ =  this.fieldService.getTableVisibleUserFields('groups');
    this.fields$.subscribe( result => {
      this.page.pageLength = result.length;
        // in arrays konvertieren
        result.forEach(( col: Field, index: number) => {
          this.displayedColumnNames[index] = col.Name;
          this.displayedColumns[index] = col;
        });
    });
  }
}
