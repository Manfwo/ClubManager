import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'cl-activity-update-header',
  templateUrl: './activity-update-header.component.html',
  styleUrls: ['./activity-update-header.component.scss']
})
export class ActivityUpdateHeaderComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  onHelp() {
    var win = window.open("http://kgr-database/kgr_club_manual/doku.php?id=manual:aktivitaeten_1", '_blank');
    win.focus();
  }
}
