import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'cl-dashboard-header',
  templateUrl: './dashboard-header.component.html',
  styleUrls: ['./dashboard-header.component.scss']
})
export class DashboardHeaderComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  onHelp() {
    var win = window.open("http://kgr-database/kgr_club_manual/doku.php?id=manual:uebersicht_1", '_blank');
    win.focus();
  }
}
