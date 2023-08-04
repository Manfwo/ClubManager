import { MemberSelectionService } from './../../members/member-selection.service';
import { GroupTransferService } from './../group-transfer.service';
import { AfterViewInit, Component, DoCheck, OnInit, ViewChild } from '@angular/core';
import { Validators } from '@angular/forms';
import { FormGroup, FormControl } from '@angular/forms';
import { from, merge, Observable } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { Group } from '../group';
import { GroupRaw } from '../group-raw';
import { GroupStoreService } from '../group-store.service';
import { HeaderService } from './../../app-header.service';
import { MatDialog } from '@angular/material/dialog';
import { LocalStorageService } from 'src/app/_shared/local-storage.service';
import { GroupDeleteComponent } from '../group-delete/group-delete.component';
import { PageParameter } from 'src/app/_shared/page-parameter';
import { MatSort, Sort } from '@angular/material/sort';
import { Member } from 'src/app/members/member';
import { ResultValue } from 'src/app/_shared/result-value';
import { Field } from 'src/app/_general/field/field';
import { PageParameterService } from 'src/app/_shared/page-parameter.service';
import { FieldStoreService } from 'src/app/_general/field/field-store.service';
import { SidebarService } from 'src/app/app-sidebar.service';
import { mergeMap, tap } from 'rxjs/operators';
import { CdkDragDrop, CdkDragStart, moveItemInArray } from '@angular/cdk/drag-drop';
import { MemberColumnService } from 'src/app/members/member-column.service';
import { FooterService } from 'src/app/app-footer.service';
import { MatTableDataSource } from '@angular/material/table';


@Component({
  selector: 'cl-group-update',
  templateUrl: './group-update.component.html',
  styleUrls: ['./group-update.component.scss']
})
export class GroupUpdateComponent implements OnInit, DoCheck, AfterViewInit  {

  loading = true;           // Kennungn für Spinner

  // Pagination
  page: PageParameter;

  // Sortierung
  @ViewChild(MatSort) sort: MatSort;
  sortField = 'me_family_name';
  sortActive = '';
  sortDirection = 'ASC';

  // Spaltenreihenfolge
  bodyElement: HTMLElement = document.body;

  // Tabellen Daten (Mitglieder der Gruppe)
  displayedColumns: any[] = [];
  displayedColumnNames: string[] = [];
  members$: Observable<Member[]>;
  member$: Observable<Member>;
  memberList: Member[] = [];
  count$: Observable<ResultValue>;

  // Tabellenkopf
  fields$: Observable<Field[]>;
  fieldsSelectedOld: Field[] = [];
  fieldsSelected: Field[] = [];

  // Gruppendaten
  myForm: FormGroup;
  group: GroupRaw = new GroupRaw;
  updateflag: boolean = false;
  result$: Observable<string>;
  groupIn: Group;
  memberlist: Member[];

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private localStore: LocalStorageService,
    private pageService: PageParameterService,
    private fieldService: FieldStoreService,
    private headerService: HeaderService,
    private footerService: FooterService,
    private sidebarService: SidebarService,
    private columnService: MemberColumnService,
    private memSelectionService: MemberSelectionService,
    private storeService: GroupStoreService,
    private goupTransferService: GroupTransferService,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    // close Sidebar
    this.sidebarService.nextMessage(false);
    this.localStore.set('sidebar_filter',"group");

    // Gruppe übernehmen
    this.goupTransferService.sharedGroup.subscribe(value => {
      this.groupIn = value
    });

    // Mitglieder übernehmen
    this.memSelectionService.sharedMemberList.subscribe(value => {
      this.memberlist = value
      console.log("ADD_TO_GROUP",this.memberlist[0]);
    });
/*
    if (this.memberList != undefined ) {
      console.log("GROUPUPDATE",this.member$[0].Alias + " - " + this.memberList.length);
    }
    else
      console.log("GROUPUPDATE undefinde");
*/
    // Eingabeformular erzeugen
    this.myForm = new FormGroup({
      name: new FormControl('',Validators.required),
      comment: new FormControl(''),
    });
    // Set values
    if (this.groupIn != undefined) {
      this.myForm.get('name').patchValue(this.groupIn.Name);
      this.myForm.get('comment').patchValue(this.groupIn.Comment);
    }

    // Spalten von Spaltenauswahl
    this.columnService.sharedMessageGroup.subscribe(list =>
      this.fieldsSelected = list);

    // gespeicherte Einstellungen lesen
    this.sortDirection = this.localStore.get('groupmemSortDirection');
    this.sortField = this.localStore.get('groupmemSortFieldDb');

    // Init Table
    this.initTableColumns();

    // Paginator
    this.pageService.sharedPageParameter.subscribe(value => {this.page = value;
      this.loadGroupMemberPage();
    });

    this.loading = true;
    this.members$ = this.storeService.getGroupMemPage(this.groupIn.Id, this.sortField, this.sortDirection, 0, this.localStore.get('memberPageSize'));
    this.members$.subscribe( result => {
      this.loading = false;
    });
  }

  ngAfterViewInit(): void {
    // wegen ExpressionChangedAfterItHasBeenCheckedError
    setTimeout(() => {
      this.sortActive = this.sortField;
      this.sort.direction = this.localStore.get('groupmemSortDirection');
      this.sortActive = this.localStore.get('groupmemSortField');
    });

    // reset the paginator after sorting
    this.sort.sortChange.subscribe(() => this.page.pageIndex = 0);

    // on sort or paginate events, load a new page
    merge(this.sort.sortChange, this.page.pageIndex)
    .pipe(
      tap(() => this.loadGroupMemberPage())
    )
    .subscribe();
  }

  ngDoCheck(): void {
    if (this.loading === false) {
      // Spalten Änderung
      if ((this.fieldsSelected !== null) && (this.fieldsSelected.length > 0) && (this.fieldsSelected !== this.fieldsSelectedOld)) {
        this.fieldsSelectedOld = this.fieldsSelected;
        this.displayedColumnNames = [];
        this.displayedColumns = [];
        this.fieldsSelected.forEach(( col, index) => {
          this.displayedColumnNames[index] = col.Name;
          this.displayedColumns[index] = col;
          this.loadGroupMemberPage();
        })
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
        this.loadGroupMemberPage();
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
      this.loadGroupMemberPage();
    }
  }

  public onUpdate(): void {
    this.updateflag =true;
  }

  public onCancel():  void {
    this.updateflag = false;
  }

  public onDelete():  void {
    this.updateflag = false;

    let dialogRef = this.dialog.open(GroupDeleteComponent,
      {width: '450px', data: { group: this.groupIn}});
  }

  public onFormSubmit() {
    this.group.Id = this.groupIn.Id;
    this.group.Name = this.myForm.get('name').value;
    this.group.Comment = this.myForm.get('comment').value;
    //console.log("onFormSubmit", this.group.Id);
    if (this.updateflag) {
      this.result$ = this.storeService.update(this.group)
      this.result$.subscribe(message  => {
        //console.log(message);
        this.myForm.reset();
        this.headerService.nextMessage(2);
        this.footerService.nextMessage(2);
        this.router.navigate(['../', 'groups'], { relativeTo: this.route });
      });
    }
    else {
      this.myForm.reset();
      this.headerService.nextMessage(2);
      this.footerService.nextMessage(2);
      this.router.navigate(['../', 'groups'], { relativeTo: this.route });
    }
  }

// ##################
// Private functions
// ##################

  // *** Daten ermitteln
  private loadGroupMemberPage(): any {
    if (!this.loading) {
      this.countMemberPage(this.groupIn.Id);
      this.members$ = this.storeService.getGroupMemPage(this.groupIn.Id, this.sortField, this.sortDirection, this.page.pageIndex, this.page.pageSize);
      this.members$.subscribe(result => {
        // in arrays konvertieren
        result.forEach(( mem: Member, index: number) => {
          this.memberList[index] = mem;
        });
        if (this.sortActive === null) this.sortActive = '';
        if (this.sortField === null)  this.sortField = 'me_family_name';
        if (this.sortDirection === null) this.sortDirection = 'ASC';
        this.localStore.set('groupmemSortField', this.sortActive);
        this.localStore.set('groupmemSortFieldDb', this.sortField);
        this.localStore.set('groupmemSortDirection', this.sortDirection);
        this.localStore.set('groupmemPageSize', this.page.pageSize);
      } )
    }
  }

  private countMemberPage(id: number): any {
    this.count$ = this.storeService.getGroupMemCount(id);
    this.count$.subscribe( result => {
      this.pageService.nextLength(result[0].resCount);
      console.log("COUNT",result[0].resCount);
    });
  }

  // *** Init Tabellenkopf
  private initTableColumns(): void {
    // sichtbare Spalten lesen
    this.fields$ =  this.fieldService.getTableVisibleUserFields('groupmem');
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

