import { Component, OnInit } from '@angular/core';
import { HeaderService } from './../../../app-header.service';
import { MemberStoreService } from '../../../members/member-store.service';
import { ActivityStoreService } from '../../../activity/activity-store.service';
import { FormGroup, FormControl } from '@angular/forms';
import { Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { SettingTransferService } from '../setting-transfer.service';
import { LocalStorageService } from '../../../_shared/local-storage.service';

@Component({
  selector: 'cl-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent implements OnInit {

  myForm: FormGroup;
  currentYear: number;
  result$: Observable<string>;
  memberResignList = 'n';

  constructor(
    private hs: HeaderService,
    private ms: MemberStoreService,
    private as: ActivityStoreService,
    private settingssService: SettingTransferService,
    private localStore: LocalStorageService)  { }

  ngOnInit(): void {

    // Headline ändern
    this.hs.nextMessage(99);

    // Settings für ehemalige Mitglieder lesen
    let rMemberList = false;
    this.memberResignList = this.localStore.get('member_resign');
    if (this.memberResignList == 'y')
        rMemberList = true;

    // Vorbesetzung für AKtivenjahren Berechnung
    let currentDate = new Date();
    this.currentYear = currentDate.getFullYear();

    // Formular Werte setzen
    this.myForm = new FormGroup({
      year: new FormControl(this.currentYear,[Validators.min(1955),Validators.max(this.currentYear),Validators.pattern('^[0-9]*$')]),
      resignMemList:new FormControl(rMemberList)
    })
  }

  onCreateAlias() {
    this.result$ = this.ms.generateAlias();
    this.result$.subscribe(message  => console.log(message));
  }

  onCreateFamily() {
    this.result$ = this.ms.generateParentChilds();
    this.result$.subscribe(message  => console.log(message));
  }

  onDetermineActiveYears() {
    this.result$ = this.as.generateTributeValues();
    this.result$.subscribe(message  => console.log(message));

    this.result$ = this.ms.generateMemberYears();
    this.result$.subscribe(message  => console.log(message));
  }

  onCalcAge() {
    this.result$ = this.ms.calcAge();
    this.result$.subscribe(message  => console.log(message));
  }

  onDetermineActiveState() {
    let year = this.myForm.get('year').value;
    if (year == undefined) {
      let currentDate = new Date();
      year = currentDate.getFullYear();
    }

    this.result$ = this.as.generateActiveState(year);
    this.result$.subscribe(message  => console.log(message));
  }

  onResignMemberList(){
    if (this.myForm.get('resignMemList').value != true)
      this.memberResignList = 'y';
    else
      this.memberResignList = 'n';
    this.localStore.set('member_resign', this.memberResignList);
    this.settingssService.nextMessage(this.memberResignList);
  }
}
