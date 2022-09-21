import {  Component } from '@angular/core';

@Component({
  selector: 'cl-activity-create-header',
  templateUrl: './activity-create-header.component.html',
  styleUrls: ['./activity-create-header.component.scss']
})
export class ActivityCreateHeaderComponent {

  constructor( ) {
  }

  onHelp() {
    var win = window.open("http://kgr-database/kgr_club_manual/doku.php?id=manual:aktivitaeten_1", '_blank');
    win.focus();
  }

}
