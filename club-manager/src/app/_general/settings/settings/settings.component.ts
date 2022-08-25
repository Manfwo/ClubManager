import { Component, OnInit } from '@angular/core';
import { HeaderService } from './../../../app-header.service';
import { MemberStoreService } from '../../../members/member-store.service';
import { ActivityStoreService } from '../../../activity/activity-store.service';
import { FormGroup, FormControl } from '@angular/forms';
import { Validators } from '@angular/forms';
import { Observable } from 'rxjs';

@Component({
  selector: 'cl-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent implements OnInit {

  myForm: FormGroup;
  currentYear: number;
  result$: Observable<string>;

  constructor(
    private hs: HeaderService,
    private ms: MemberStoreService,
    private as: ActivityStoreService
    ) { }

  ngOnInit(): void {
    // Headline ändern
    this.hs.nextMessage(99);

    let currentDate = new Date();
    this.currentYear = currentDate.getFullYear();

    this.myForm = new FormGroup({
      year: new FormControl(this.currentYear,[Validators.min(1955),Validators.max(this.currentYear),Validators.pattern('^[0-9]*$')]),
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

  }

  onDetermineActiveState() {
    let year = this.myForm.get('year').value;
    if (year == undefined) {
      let currentDate = new Date();
      year = currentDate.getFullYear();
    }
    console.log(year)
    this.result$ = this.as.generateActiveState(year);
    this.result$.subscribe(message  => console.log(message));
  }
}
