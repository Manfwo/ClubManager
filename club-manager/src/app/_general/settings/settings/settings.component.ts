import { Component, OnInit } from '@angular/core';
import { HeaderService } from './../../../app-header.service';
import { MemberStoreService } from '../../../members/member-store.service';

@Component({
  selector: 'cl-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent implements OnInit {

  constructor(
    private hs: HeaderService,
    private ms: MemberStoreService,
    ) { }

  ngOnInit(): void {
    this.hs.nextMessage(99);
  }

  onTest() {
    console.log('TEST-SETZINGS');
    //this.ms.

  }
}
