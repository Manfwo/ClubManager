import {  Component } from '@angular/core';

@Component({
  selector: 'cl-member-update-header',
  templateUrl: './member-update-header.component.html',
  styleUrls: ['./member-update-header.component.scss']
})
export class MemberUpdateHeaderComponent {

  constructor( ) {
   }

  onHelp() {
    var win = window.open("http://kgr-database/kgr_club_manual/doku.php?id=manual:mitglieder_1", '_blank');
    win.focus();
  }
}
