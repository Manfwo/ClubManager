import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'cl-group-create-header',
  templateUrl: './group-create-header.component.html',
  styleUrls: ['./group-create-header.component.scss']
})
export class GroupCreateHeaderComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  onHelp() {
    var win = window.open("http://kgr-database/kgr_club_manual/doku.php?id=manual:gruppen_1", '_blank');
    win.focus();
  }
}
