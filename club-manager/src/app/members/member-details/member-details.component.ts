import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { Member } from '../../_shared/member';
import { MemberStoreService } from '../../_shared/member-store.service';

@Component({
  selector: 'cl-member-details',
  templateUrl: './member-details.component.html',
  styleUrls: ['./member-details.component.scss']
})
export class MemberDetailsComponent implements OnInit {
  member: Member;

  constructor(
    private mb: MemberStoreService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    const params = this.route.snapshot.paramMap;
    console.log('Param: ', params.get('id'));
    this.mb.getSingle(parseInt(params.get('id'), 10))
      .subscribe(m => this.member = m);
  }

  getRating(num: number): Array<number> {
    return new Array(num);
  }

  removeMember(): void {
    if (confirm('Mitglied wirklich löschen?')) {
      this.mb.remove(this.member.Id)
        .subscribe(res => this.router.navigate(['../'], { relativeTo: this.route }));
    }
  }
}
