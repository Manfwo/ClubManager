import { Component, OnInit,Output, EventEmitter, AfterViewInit  } from '@angular/core';

@Component({
  selector: 'cl-report-header',
  templateUrl: './report-header.component.html',
  styleUrls: ['./report-header.component.scss']
})
export class ReportHeaderComponent implements OnInit, AfterViewInit  {

  @Output() hideSidebarEvent = new EventEmitter();

  constructor() {
   }

  ngOnInit(): void {

  }

  ngAfterViewInit() {
    //this.hideSidebarEvent.emit(true);
  }

}
