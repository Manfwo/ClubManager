import { Observable } from 'rxjs';
import { MemberStoreService } from './../member-store.service';
import { Component, OnInit } from '@angular/core';
import { Member } from '../member';

@Component({
  selector: 'cl-member-create',
  templateUrl: './member-create.component.html',
  styleUrls: ['./member-create.component.scss']
})
export class MemberCreateComponent implements OnInit {

  member: Member;
  result$: Observable<string>;

  constructor(private ms: MemberStoreService) { }

  ngOnInit(): void {
    console.log("MemberCreateComponent");
    this.member = new Member;
  }

  createMember(member: Member) {
    console.log("CREATE_ MEMBER");
    this.result$ = this.ms.create(member)
    this.result$.subscribe(message  => console.log(message));
  }
}
