import { MemberStoreService } from './../member-store.service';
import { Component, Output, EventEmitter, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { SidebarService } from './../../app-sidebar.service';
import { fromEvent, Observable } from 'rxjs';
import { Router } from '@angular/router';
import { LocalStorageService } from 'src/app/_shared/local-storage.service';
import { Member } from '../member';
import { MemberSelectionService } from '../member-selection.service';
import { debounceTime, distinctUntilChanged, tap } from 'rxjs/operators';

@Component({
  selector: 'cl-member-select-list',
  templateUrl: './member-select-list.component.html',
  styleUrls: ['./member-select-list.component.scss']
})

export class MemberSelectListComponent implements OnInit {

  // Suche
  @ViewChild('input') input: ElementRef;
  public search = "";

  @Output() sidebarEventOff = new EventEmitter<boolean>();

  public myForm: FormGroup;
  public memberList: Member[]=[];

  constructor(
    private formb: FormBuilder,
    private localStore: LocalStorageService,
    private router: Router,
    private storeService: MemberStoreService,
    private memberSelectionService: MemberSelectionService,
    private sidebarService: SidebarService) {}

  ngOnInit(): void {

    // Lese der Mitglieder
    this.storeService.getPage(this.search,"","me_family_name","ASC",0,1000,"0")
    .subscribe(members => {
      this.memberList = members;
      console.log('fieldList.Length', this.memberList.length)

      // Sidebar einschalten
      this.sidebarService.nextMessage(true);
    });

    // Erzeuge FormGroup
    this.myForm = this.formb.group({
        selectedFields: ''
      });
  }

  ngAfterViewInit(): void {

    setTimeout(() => {
      this.input.nativeElement.value = this.search;
    });

    // server-side search
    fromEvent(this.input.nativeElement, 'keyup')
    .pipe(
        debounceTime(150),
        distinctUntilChanged(),
        tap(() => {
           this.search = this.input.nativeElement.value;
               // Lesen der Mitglieder
          this.storeService.getPage(this.search,"","me_family_name","ASC",0,1000,"0")
          .subscribe(members => {this.memberList = members});
        })
    )
    .subscribe();
  }

  onFormSubmit() {
    let results: Member[];
    results = this.myForm.get('selectedFields').value;
    console.log("RESULT",results.length);
    console.log("RESULT",results[0].Id);
    console.log("RESULT",results[0].Alias);
    if (results.length != 0) {
      this.memberSelectionService.nextMessage(results);
    }
  }

  onClose() {
    // Sidebar schliessen
    this.sidebarService.nextMessage(false);
     // Menüpunkt close aufrufen
    this.router.navigate([{ outlets: {sidebar: ['close']}}]);
  }
}
