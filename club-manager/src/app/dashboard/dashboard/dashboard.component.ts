import { Component, OnInit } from '@angular/core';
import { SidebarService } from 'src/app/app-sidebar.service';
import { HeaderService } from 'src/app/app-header.service';

@Component({
  selector: 'cl-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  mode: number = 0;

  constructor( private sb: SidebarService,
               private headerService: HeaderService
        ) { }

  ngOnInit(): void {
    this.headerService.nextMessage(0);
    this.sb.nextMessage(false);
  }

}
