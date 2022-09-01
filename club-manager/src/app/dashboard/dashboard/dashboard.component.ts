import { Component, OnInit } from '@angular/core';
import { SidebarService } from 'src/app/app-sidebar.service';

@Component({
  selector: 'cl-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  mode: number = 0;

  constructor( private sb: SidebarService) { }

  ngOnInit(): void {
    this.sb.nextMessage(false);
  }

}
