import { AfterContentInit, Component, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { LocalStorageService } from '../../_shared/local-storage.service';

@Component({
  selector: 'cl-statistic-header',
  templateUrl: './statistic-header.component.html',
  styleUrls: ['./statistic-header.component.scss']
})
export class StatisticHeaderComponent implements AfterContentInit {

  @Output() hideSidebarEvent = new EventEmitter<boolean>();

  constructor( private localStore: LocalStorageService, private router: Router) {

   }

  ngAfterContentInit(): void {

  }

  onHelp() {
    var win = window.open("http://kgr-database/kgr_club_manual/doku.php?id=manual:statistik_1", '_blank');
    win.focus();
  }
}
