import { ActivityMem } from './../activity-mem';
import { Component, Input, ViewChild, OnInit, AfterViewInit, DoCheck, } from '@angular/core';
import { CdkDragStart, CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { MatSort, Sort } from '@angular/material/sort';
import { Observable, merge } from 'rxjs';
import { tap } from 'rxjs/operators';
import { LocalStorageService } from '../../_shared/local-storage.service';
import { ResultValue } from '../../_shared/result-value';
import { Activity } from '../activity';
import { ActivityStoreService } from '../activity-store.service';
import { ActivitySearchService } from '../activity-search.service';
import { ActivityTransferService } from '../activity-transfer.service';
import { ActivityColumnService } from '../activity-column.service';
import { FieldStoreService } from '../../_general/field/field-store.service';
import { HeaderService } from 'src/app/app-header.service';
import { Field } from '../../_general/field/field';
import { Router } from '@angular/router';
import { PageParameterService } from '../../_shared/page-parameter.service';
import { PageParameter } from '../../_shared/page-parameter';
import { SidebarService } from 'src/app/app-sidebar.service';

@Component({
  selector: 'cl-activity-table',
  templateUrl: './activity-table.component.html',
  styleUrls: ['./activity-table.component.scss']
})

export class ActivityTableComponent implements OnInit, DoCheck, AfterViewInit{

  loading = true;           // Kennungn für Spinner

  // Suche
  @Input() search: string;
  filter1: string;
  filter2: string;
  searchText: string;
  searchTextOld: string;

  // Pagination
  page: PageParameter;

  // Sortierung
  @ViewChild(MatSort) sort: MatSort;
  sortField = 'me_alias';
  sortActive = '';
  sortDirection = 'ASC';

  // Spaltenreihenfolge
  bodyElement: HTMLElement = document.body;

  // Tabellen Daten
  activitys$: Observable<ActivityMem[]>;
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
    private headerService: HeaderService,
    private pageService: PageParameterService,
    private fieldStoreService: FieldStoreService,
    private sidebarService: SidebarService,
    private storeService:ActivityStoreService,
    private searchSerice:ActivitySearchService,
    private columService:ActivityColumnService,
    private transferService:ActivityTransferService) {}

  ngOnInit(): void {
    // close Sidebar
    this.sidebarService.nextMessage(false);

    // Suchtext from Header
    this.searchSerice.sharedMessage.subscribe(message => this.searchText = message)

    // Spalten von Spaltenauswahl
    this.columService.sharedMessage.subscribe(list => this.fieldsSelected = list)

    // Paginator
    this.pageService.sharedPageParameter.subscribe(value => {this.page = value;
      this.loadActivityPage();});

    // gespeicherte Einstellungen speichern
    this.filter1 = "" //this.localStore.get('activityFilter');
    this.filter2 = "" //this.localStore.get('activityFilterYear');
    this.sortDirection = this.localStore.get('activitySortDirection');
    this.sortField = this.localStore.get('activitySortFieldDb'),

    // Init Table
    this.initTableColumns();

    this.loading = true;

    this.activitys$ = this.storeService.getPage(this.filter1,this.filter2, this.sortField, this.sortDirection, 0, this.localStore.get('activityPageSize'));
    this.activitys$.subscribe( result => {
      this.loading = false;
    });
  }

  ngAfterViewInit(): void {
    // wegen ExpressionChangedAfterItHasBeenCheckedError
    setTimeout(() => {
      this.sortActive = this.sortField;
      this.sort.direction = this.localStore.get('activitySortDirection');
      this.sortActive = this.localStore.get('activitySortField');
    });

    // reset the paginator after sorting
    this.sort.sortChange.subscribe(() => this.page.pageIndex = 0);

    // on sort or paginate events, load a new page
    merge(this.sort.sortChange, this.page.pageIndex)
    .pipe(
      tap(() => this.loadActivityPage())
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
          var parts = this.searchText.split('/');
          if(parts && parts.length > 0) {
            this.filter1 = parts[0];
            this.filter2 = parts[1];
            change = true;
          }
      }

      // Spalten Änderung
      if ((this.fieldsSelected !== null) && (this.fieldsSelected.length > 0) && (this.fieldsSelected !== this.fieldsSelectedOld)) {
          this.fieldsSelectedOld = this.fieldsSelected;
          this.displayedColumnNames = [];
          this.displayedColumns = [];
          this.fieldsSelected.forEach(( col, index) => {
          this.displayedColumnNames[index] = col.Name;
          this.displayedColumns[index] = col;
          change = true;
        })
      }

      // Seite neu laden
      if (change == true)
        this.loadActivityPage();
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
      if (sort.active == item.Name) {
        this.sortField = item.Column;
        this.loadActivityPage();
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
      this.loadActivityPage();
    }
  }

  editActivity($event:ActivityMem) {
    this.headerService.nextMessage(13);
    this.transferService.nextMessage($event);
    this.router.navigate( ['act-update']);
  }

  // *** Daten ermitteln
  private loadActivityPage(): any {
    this.countActivityPage();
    this.activitys$ = this.storeService.getPage(this.filter1, this.filter2, this.sortField, this.sortDirection, this.page.pageIndex, this.page.pageSize);
    this.activitys$.subscribe(result => {
      if (this.sortActive === null) this.sortActive = '';
      if (this.sortField === null)  this.sortField = 'me_alias, ac_year';
      if (this.sortDirection === null) this.sortDirection = 'ASC';
      if (this.filter1 === null) this.filter1 = '';
      if (this.filter2 === undefined) this.filter2 = '';
      this.localStore.set('activitySortField', this.sortActive);
      this.localStore.set('activitySortFieldDb', this.sortField);
      this.localStore.set('activitySortDirection', this.sortDirection);
      this.localStore.set('activityPageSize', this.page.pageSize);
      this.localStore.set('activityFilter', this.filter1);
      this.localStore.set('activityFilterYear', this.filter2);
    } )
  }

  private countActivityPage(): any {
    this.count$ = this.storeService.getCount(this.filter1, this.filter2);
    this.count$.subscribe( result => {
      this.page.pageLength = result[0].resCount;
    });
  }

  // *** Init Tabellenkopf
  private initTableColumns(): void {
    // sichtbare Spalten lesen
    this.fields$ =  this.fieldStoreService.getTableVisibleUserFields('activities-mem');
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
