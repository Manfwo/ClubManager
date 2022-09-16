import { Component, Input, ViewChild, OnInit, AfterViewInit, DoCheck, } from '@angular/core';
import { CdkDragStart, CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { MatSort, Sort } from '@angular/material/sort';
import { Observable, merge } from 'rxjs';
import { tap } from 'rxjs/operators';
import { LocalStorageService } from './../../_shared/local-storage.service';
import { ResultValue } from './../../_shared/result-value';
import { Member } from '../member';
import { MemberStoreService } from '../member-store.service';
import { MemberSearchService } from '../member-search.service';
import { MemberTransferService } from '../member-transfer.service';
import { MemberColumnService } from '../member-column.service';
import { FieldStoreService } from '../../_general/field/field-store.service';
import { HeaderService } from 'src/app/app-header.service';
import { Field } from '../../_general/field/field';
import { Router } from '@angular/router';
import { PageParameterService } from './../../_shared/page-parameter.service';
import { PageParameter } from './../../_shared/page-parameter';
import { SidebarService } from 'src/app/app-sidebar.service';
import { MemberFilterService } from '../member-filter.service';
import { Filter } from 'src/app/_general/filter/filter';

@Component({
  selector: 'cl-member-table',
  templateUrl: './member-table.component.html',
  styleUrls: ['./member-table.component.scss']
})

export class MemberTableComponent implements OnInit, DoCheck, AfterViewInit{

  loading = true;           // Kennungn für Spinner

  // Suche
  @Input() search: string;

  // Settings  -> Ablage o Mitgliederliste
  resignList = 'n';
  oldresignList: string;
  settingsName: string;

  // Pagination
  page: PageParameter;

  // Sortierung
  @ViewChild(MatSort) sort: MatSort;
  sortField = 'me_family_name';
  sortActive = '';
  sortDirection = 'ASC';

  // Spaltenreihenfolge
  bodyElement: HTMLElement = document.body;

  // Filter von Filterauswahl
  Additionfilter: Filter;
  filterName: string;
  filterCondition: string;
  oldFilterCondition = '';

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
    private localStore: LocalStorageService,
    private storeService: MemberStoreService,
    private searchService: MemberSearchService,
    private columnService: MemberColumnService,
    private filterService: MemberFilterService,
    private headerService: HeaderService,
    private transferService: MemberTransferService,
    private pageService: PageParameterService,
    private fieldService: FieldStoreService,
    private sidebarService: SidebarService) {}

  ngOnInit(): void {
    // close Sidebar
    this.sidebarService.nextMessage(false);

    // Settings für ehemalige Mitglieder lesen
    this.resignList = this.localStore.get('member_resign');
    if (this.resignList == 'y')
        this.settingsName = "members-resign";
    else
        this.settingsName = "members";

    // Suchtext from Header
    this.searchService.sharedMessage.subscribe(message => this.searchText = message)

    // Spalten von Spaltenauswahl
    this.columnService.sharedMessage.subscribe(list => this.fieldsSelected = list)

    // FilterCondition von Filterauswahl
    this.filterName = this.localStore.get('memberFilterName');
    console.log("FILTERNAME",this.filterName);
    this.filterService.nextMessage1(this.filterName);
    this.filterCondition = this.localStore.get('memberFilterCondition');
    this.filterService.sharedMessage.subscribe(f => {this.Additionfilter = f;
      if (this.Additionfilter != undefined)
          this.filterCondition = this.Additionfilter.Condition;
      console.log("FILTER",this.filterCondition)});

    // gespeicherte Einstellungen lesen
    this.search = this.localStore.get('memberSearch');
    this.sortDirection = this.localStore.get('memberSortDirection');
    this.sortField = this.localStore.get('memberSortFieldDb'),

    // Paginator
    this.pageService.sharedPageParameter.subscribe(value => {this.page = value;
      this.loadMemberPage();
    });

    // Init Table
    this.initTableColumns();

    this.loading = true;
    this.members$ = this.storeService.getPage(this.search,this.filterCondition, this.sortField, this.sortDirection, 0, this.localStore.get('memberPageSize'), this.resignList);
    this.members$.subscribe( result => {
      this.loading = false;
    });
  }

  ngAfterViewInit(): void {
    // wegen ExpressionChangedAfterItHasBeenCheckedError
    setTimeout(() => {
      this.sortActive = this.sortField;
      this.sort.direction = this.localStore.get('memberSortDirection');
      this.sortActive = this.localStore.get('memberSortField');
    });

    // reset the paginator after sorting
    this.sort.sortChange.subscribe(() => this.page.pageIndex = 0);

    // on sort or paginate events, load a new page
    merge(this.sort.sortChange, this.page.pageIndex)
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
          this.search = this.searchText;
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

      if (this.resignList != this.oldresignList) {
        this.oldresignList = this.resignList;
        change = true;
      }

      if (this.filterCondition != this.oldFilterCondition) {
        this.oldFilterCondition = this.filterCondition;
        if (this.Additionfilter != undefined) {
          this.filterService.nextMessage1(this.Additionfilter.Name);
          if (this.Additionfilter.Name == undefined) {
            this.Additionfilter.Name = "";
            this.Additionfilter.Condition = "";
          }
          this.localStore.set('memberFilterName', this.Additionfilter.Name);
          this.localStore.set('memberFilterCondition', this.Additionfilter.Condition);
        }
        change = true;
      }

      // Seite neu laden
      if (change == true) {
        //console.log("NHDOCHECK");
        this.loadMemberPage();
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
    this.sortDirection = sort.direction;
    this.displayedColumns.forEach(item => {
      if (sort.active == item.Name) {
        this.sortField = item.Column;
        //console.log('SORTDATA', this.sortField);
        this.loadMemberPage();
      }
    });
  }

  // *** Spaltenreihenfolge per Drag & Drop ändern
  dragStarted(event: CdkDragStart): void  {
    //console.log('MemberTable.DragStarted.event', event );
    // this.bodyElement.classList.add('inheritCursors');
    this.bodyElement.style.cursor = 'move';
  }

  dropListDropped(event: CdkDragDrop<any[]>): void  {
    //console.log('MemberTable.DropListDropped', event);
    if (event) {
      moveItemInArray(this.displayedColumns, event.previousIndex, event.currentIndex);
      moveItemInArray(this.displayedColumnNames, event.previousIndex, event.currentIndex);
      // this.bodyElement.classList.remove('inheritCursors');
      this.bodyElement.style.cursor = 'unset';
      this.loadMemberPage();
    }
  }

  editMember($event:Member) {
    this.headerService.nextMessage(12);
    this.transferService.nextMessage($event);
    this.router.navigate( ['mem-update']);
  }

  // *** Daten ermitteln
  private loadMemberPage(): any {
    if (!this.loading) {
      console.log("LOADMEMBERPAGE");
      this.countMemberPage();
      this.members$ = this.storeService.getPage(this.search, this.filterCondition,this.sortField, this.sortDirection, this.page.pageIndex, this.page.pageSize, this.resignList);
      this.members$.subscribe(result => {
        // save Settings
        //console.log('memberSortField', this.sortActive);
        //console.log('memberSortFieldDb', this.sortField);
        //console.log('memberSortDirection', this.sortDirection);
        //console.log('memberPageSize', this.page.pageSize);
        //console.log('memberFilter', this.filter);
        if (this.sortActive === null) this.sortActive = '';
        if (this.sortField === null)  this.sortField = 'me_family_name';
        if (this.sortDirection === null) this.sortDirection = 'ASC';
        if (this.search === null) this.search = '';
        this.localStore.set('memberSortField', this.sortActive);
        this.localStore.set('memberSortFieldDb', this.sortField);
        this.localStore.set('memberSortDirection', this.sortDirection);
        this.localStore.set('memberPageSize', this.page.pageSize);
        this.localStore.set('memberSearch', this.search);
      } )
    }
  }

  private countMemberPage(): any {
    this.count$ = this.storeService.getCount(this.search, this.resignList);
    this.count$.subscribe( result => {
      this.page.pageLength = result[0].resCount;
    });
  }

  // *** Init Tabellenkopf
  private initTableColumns(): void {
    // sichtbare Spalten lesen
    this.fields$ =  this.fieldService.getTableVisibleUserFields(this.settingsName);
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
