import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'cl-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  mode: number = 0;

  constructor() { }

  ngOnInit(): void {
  }

}
