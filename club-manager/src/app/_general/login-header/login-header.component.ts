import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'cl-login-header',
  templateUrl: './login-header.component.html',
  styleUrls: ['./login-header.component.scss']
})
export class LoginHeaderComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  onHelp() {
    var win = window.open("http://kgr-database/kgr_club_manual/doku.php?id=manual:uebersicht_1", '_blank');
    win.focus();
  }
}
