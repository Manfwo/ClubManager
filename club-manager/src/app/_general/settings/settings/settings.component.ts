import { Component, OnInit } from '@angular/core';
import { HeaderService } from './../../../app-header.service';

@Component({
  selector: 'cl-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent implements OnInit {

  constructor(private hs: HeaderService) { }

  ngOnInit(): void {
    this.hs.nextMessage(99);
  }

  onTest() {
    console.log('TEST-SETZINGS');
  }
}
