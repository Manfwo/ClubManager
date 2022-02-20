import { AfterContentInit, Component, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { LocalStorageService } from '../../_shared/local-storage.service';

@Component({
  selector: 'cl-statistic-header',
  templateUrl: './statistic-header.component.html',
  styleUrls: ['./statistic-header.component.scss']
})
export class StatisticHeaderComponent implements AfterContentInit {

  @Output() hideSidebarEvent = new EventEmitter();

  constructor( private localStore: LocalStorageService, private router: Router) {

   }

  ngAfterContentInit(): void {

  }

}
