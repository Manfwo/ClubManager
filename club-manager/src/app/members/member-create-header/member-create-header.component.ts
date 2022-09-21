import {  Component } from '@angular/core';

@Component({
  selector: 'cl-member-create-header',
  templateUrl: './member-create-header.component.html',
  styleUrls: ['./member-create-header.component.scss']
})
export class MemberCreateHeaderComponent {

  constructor( ) {
   }

  onHelp() {
    var win = window.open("http://kgr-database/kgr_club_manual/doku.php?id=manual:mitglieder_1", '_blank');
    win.focus();
  }
}
