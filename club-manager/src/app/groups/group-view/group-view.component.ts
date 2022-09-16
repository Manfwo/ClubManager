import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'cl-group-view',
  templateUrl: './group-view.component.html',
  styleUrls: ['./group-view.component.scss']
})
export class GroupViewComponent implements OnInit {

  public search = '';

  constructor() { }

  ngOnInit(): void {
    console.log("GROUPVIEW");
  }

}
