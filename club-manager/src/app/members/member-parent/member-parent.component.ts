import { Component, Input, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Member } from '../member';
import { MemberStoreService } from '../member-store.service';

@Component({
  selector: 'cl-member-parent',
  templateUrl: './member-parent.component.html',
  styleUrls: ['./member-parent.component.scss']
})
export class MemberParentComponent implements OnInit {

  @Input() w_parent: number = 0;
  @Input() m_parent: number = 0;

  public parent1 = "";
  public parent2 = "";

  private members$:Observable<Member[]>;

  constructor( private storeService: MemberStoreService) { }

  ngOnInit(): void {
    // Eltern (Mutter) lesen wenn vorhanden
    if (this.w_parent > 0) {
      this.members$ = this.storeService.getByMemberId(this.w_parent);
      this.members$.subscribe(m  => {
        if(m[0] != undefined)
          this.parent1= m[0].Firstname + " " + m[0].Familyname;
        }
      );
    }

    // Eltern (Vater) lesen wenn vorhanden
    if (this.m_parent > 0) {
      this.members$ = this.storeService.getByMemberId(this.m_parent);
      this.members$.subscribe(m  => {
        if(m[0] != undefined)
          this.parent2= m[0].Firstname + " " + m[0].Familyname;
        }
      );
    }
  }
}
