import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'cl-member-columns',
  templateUrl: './member-columns.component.html',
  styleUrls: ['./member-columns.component.scss']
})
export class MemberColumnsComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    console.log('Init ColumnComponent');
  }

}
