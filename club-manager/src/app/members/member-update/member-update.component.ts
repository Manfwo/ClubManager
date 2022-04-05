import { Observable } from 'rxjs';
import { MemberStoreService } from '../member-store.service';
import { Component, OnInit } from '@angular/core';
import { MemberRaw } from '../member-raw';
import { Router, ActivatedRoute } from '@angular/router';
import { HeaderService } from '../../app-header.service';

@Component({
  selector: 'cl-member-update',
  templateUrl: './member-update.component.html',
  styleUrls: ['./member-update.component.scss']
})
export class MemberUpdateComponent implements OnInit {

  member: MemberRaw;
  result$: Observable<string>;

  constructor(
    private ms: MemberStoreService,
    private sh:HeaderService,
    private router:Router,
    private route:ActivatedRoute) { }

  ngOnInit(): void {
    console.log("MemberCreateComponent");
    this.member = new MemberRaw;
  }

  createMember(member: MemberRaw) {
    this.result$ = this.ms.create(member)
    this.result$.subscribe(message  => console.log(message));
    this.sh.nextMessage(1);
    this.router.navigate(['../', 'members'], { relativeTo: this.route });
  }

  createMemberNew(member: MemberRaw) {
    this.result$ = this.ms.create(member)
    this.result$.subscribe(message  => console.log(message));
  }
}
