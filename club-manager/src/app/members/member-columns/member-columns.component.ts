import { Component, Output, EventEmitter, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { FieldStoreService } from '../../_general/field/field-store.service';
import { Field } from '../../_general/field/field';
import { MemberColumnService } from './../member-column.service';
import { SidebarService } from './../../app-sidebar.service';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { LocalStorageService } from 'src/app/_shared/local-storage.service';

@Component({
  selector: 'cl-member-columns',
  templateUrl: './member-columns.component.html',
  styleUrls: ['./member-columns.component.scss']
})
export class MemberColumnsComponent implements OnInit{

  @Output() sidebarEventOff = new EventEmitter<boolean>();

  public myForm: FormGroup;
  public fieldList: Field[]=[];

  private resultList: Field[]=[];
  private result$: Observable<string>;
  private resignList: string;
  private tablename: string;
  private sidebarMode = "members";

  constructor(
    private localStore: LocalStorageService,
    private router: Router,
    private sf: FieldStoreService,
    private formb: FormBuilder,
    private columService: MemberColumnService,
    private sidebarService: SidebarService) {}

  ngOnInit(): void {
    setTimeout(() => {
      // Sidebar einschalten
      this.sidebarService.nextMessage(true);
    },350);

    // Verwendung der Spalten
    this.sidebarMode = this.localStore.get('sidebar_filter');
    // Settings für ehemalige Mitglieder lesen
    if (this.sidebarMode != "group") {
      this.resignList = this.localStore.get('member_resign');
      if ( this.resignList =='y')
        this.tablename = "members-resign";
      else
        this.tablename = "members";
    }
    else
      this.tablename = "groupmem";

    // Lese member fields
    this.sf.getTableUserFields(this.tablename)
    .subscribe(fields => this.fieldList = fields);

    // Erzeuge FormGroup
    this.myForm = this.formb.group({
        selectedFields: ''
      });
  }

  onFormSubmit() {
    let results: string[];
    results = this.myForm.get('selectedFields').value;

    if (results.length != 0) {
      this.resultList = [];
      this.result$  = this.sf.resetVisible(this.tablename);
      this.result$.subscribe( message  => console.log(message));
      results.forEach(name => {
        for (let element of this.fieldList) {
          if (element.Column == name) {
            this.resultList.push(element);
            this.result$  = this.sf.updateVisible(element,1);
            this.result$.subscribe( message  => console.log(message));
            break;
          }
        };
      });
      if (this.sidebarMode != "group")
        this.columService.nextMessage(this.resultList);
      else
        this.columService.nextMessageGroup(this.resultList);
    }
  }

  onClose() {
    // Sidebar schliessen
    this.sidebarService.nextMessage(false);
     // Menüpunkt close aufrufen
    this.router.navigate([{ outlets: {sidebar: ['close']}}]);
  }
}
