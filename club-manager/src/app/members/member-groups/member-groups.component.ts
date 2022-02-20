import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'cl-member-groups',
  templateUrl: './member-groups.component.html',
  styleUrls: ['./member-groups.component.scss']
})
export class MemberGroupsComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    console.log('Init GroupComponent');
  }

}
