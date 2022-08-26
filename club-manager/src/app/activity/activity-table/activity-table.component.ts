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

@Component({
  selector: 'cl-activity-table',
  templateUrl: './activity-table.component.html',
  styleUrls: ['./activity-table.component.scss']
})

export class ActivityTableComponent implements OnInit, DoCheck, AfterViewInit{

  loading = true;           // Kennungn für Spinner

  // Suche
  @Input() filter: string;

  // Pagination
  page: PageParameter;

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
  activitys$: Observable<Activity[]>;
  count$: Observable<ResultValue>;
  searchText: string;
  searchTextOld: string;
  fields$: Observable<Field[]>;
  fieldsSelectedOld: Field[] = [];
  fieldsSelected: Field[] = [];

  constructor(
    private router: Router,
    private localStore: LocalStorageService,
    private mb:ActivityStoreService,
    private ms:ActivitySearchService,
    private mc:ActivityColumnService,
    private hs: HeaderService,
    private mt:ActivityTransferService,
    private ps: PageParameterService,
    private sf: FieldStoreService) {}

  ngOnInit(): void {
    // Suchtext from Header
    this.ms.sharedMessage.subscribe(message => this.searchText = message)

    // Spalten von Spaltenauswahl
    this.mc.sharedMessage.subscribe(list => this.fieldsSelected = list)

    // Paginator
    this.ps.sharedPageParameter.subscribe(value => {this.page = value;
      console.log("PAGINATOR");
      this.loadActivityPage();});

    // gespeicherte Einstellungen speichern
    this.filter = "" //this.localStore.get('activityFilter');
    this.sortDirection = this.localStore.get('activitySortDirection');
    this.sortField = this.localStore.get('activitySortFieldDb'),

    // Init Table
    this.initTableColumns();

    this.loading = true;

    this.activitys$ = this.mb.getPage(this.filter, this.sortField, this.sortDirection, 0, this.localStore.get('activityPageSize'));
    this.activitys$.subscribe( result => {
      console.log('READ_ONINIT',result.length);
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
          this.filter = this.searchText;
          change = true;
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
    console.log('SORTDATA');
    this.sortActive = sort.active;
    this.sortDirection = sort.direction;
    this.displayedColumns.forEach(item => {
      if (sort.active == item.Name) {
        this.sortField = item.Column;
        console.log('SORTDATA', this.sortField);
        this.loadActivityPage();
      }
    });
  }

  // *** Spaltenreihenfolge per Drag & Drop ändern
  dragStarted(event: CdkDragStart): void  {
    //console.log('ActivityTable.DragStarted.event', event );
    // this.bodyElement.classList.add('inheritCursors');
    this.bodyElement.style.cursor = 'move';
  }

  dropListDropped(event: CdkDragDrop<any[]>): void  {
    console.log('ActivityTable.DropListDropped', event);
    if (event) {
      moveItemInArray(this.displayedColumns, event.previousIndex, event.currentIndex);
      moveItemInArray(this.displayedColumnNames, event.previousIndex, event.currentIndex);
      // this.bodyElement.classList.remove('inheritCursors');
      this.bodyElement.style.cursor = 'unset';
      this.loadActivityPage();
    }
  }

  editActivity($event:Activity) {
    this.hs.nextMessage(12);
    this.mt.nextMessage($event);
    this.router.navigate( ['mem-update']);
  }

  // *** Daten ermitteln
  private loadActivityPage(): any {
    console.log("LOADMEMBERPAGE");
    this.countActivityPage();
    this.activitys$ = this.mb.getPage(this.filter, this.sortField, this.sortDirection, this.page.pageIndex, this.page.pageSize);
    this.activitys$.subscribe(result => {
      // save Settings
      //console.log('activitySortField', this.sortActive);
      //console.log('activitySortFieldDb', this.sortField);
      //console.log('activitySortDirection', this.sortDirection);
      //console.log('activityPageSize', this.page.pageSize);
      //console.log('activityFilter', this.filter);
      this.localStore.set('activitySortField', this.sortActive);
      this.localStore.set('activitySortFieldDb', this.sortField);
      this.localStore.set('activitySortDirection', this.sortDirection);
      this.localStore.set('activityPageSize', this.page.pageSize);
      this.localStore.set('activityFilter', this.filter);
    } )
  }

  private countActivityPage(): any {
    this.count$ = this.mb.getCount(this.filter);
    this.count$.subscribe( result => {
      this.page.pageLength = result[0].resCount;
    });
  }

  // *** Init Tabellenkopf
  private initTableColumns(): void {
    // sichtbare Spalten lesen
    this.fields$ =  this.sf.getTableVisibleUserFields('activitys');

    // in arrays konvertieren
    this.fields$.subscribe( result => {
      this.page.pageLength = result.length;

      result.forEach(( col: Field, index: number) => {
        this.displayedColumnNames[index] = col.Name;
        this.displayedColumns[index] = col;
      });
    });
  }
}
