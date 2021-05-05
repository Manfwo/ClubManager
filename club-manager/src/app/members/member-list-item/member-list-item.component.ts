import { Component, OnInit, Input } from '@angular/core';
import { Member } from '../../_shared/member';

@Component({
  selector: 'cl-member-list-item',
  templateUrl: './member-list-item.component.html',
  styleUrls: ['./member-list-item.component.scss']
})
export class MemberListItemComponent implements OnInit {
  @Input() member: Member;

  ngOnInit(): void {
  }
}
