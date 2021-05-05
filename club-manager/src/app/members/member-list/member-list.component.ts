import { tap } from 'rxjs/operators';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

import { Member } from '../../_shared/member';
import { MemberStoreService } from '../../_shared/member-store.service';

@Component({
  selector: 'cl-member-list',
  templateUrl: './member-list.component.html',
  styleUrls: ['./member-list.component.scss']
})
export class MemberListComponent implements OnInit {
  members$: Observable<Member[]>;

  constructor(private mb: MemberStoreService) { }

  ngOnInit(): void {
    this.members$ = this.mb.getAll();
    // this.members$.subscribe( v => {console.log(v); });

  }
}
