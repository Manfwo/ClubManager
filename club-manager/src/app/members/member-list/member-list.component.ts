import { tap } from 'rxjs/operators';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

import { Member } from '../member';
import { MemberStoreService } from '../member-store.service';

@Component({
  selector: 'cl-member-list',
  templateUrl: './member-list.component.html',
  styleUrls: ['./member-list.component.scss']
})
export class MemberListComponent implements OnInit {
  members$: Observable<Member[]>;
  displayedColumns = ['id', 'familyname', 'firstname','street', 'city'];

  constructor(private mb: MemberStoreService) { }

  ngOnInit(): void {
    this.members$ = this.mb.getAll();
  }
}
