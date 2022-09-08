import { Observable } from 'rxjs';
import { Component, Input, OnInit } from '@angular/core';
import { MemberStoreService } from '../member-store.service';
import { Member } from '../member';

@Component({
  selector: 'cl-member-partner-child',
  templateUrl: './member-partner-child.component.html',
  styleUrls: ['./member-partner-child.component.scss']
})
export class MemberPartnerChildComponent implements OnInit {

  @Input() mem_id: number = 0;
  @Input() partner_id: number = 0;
  @Input() has_child: number = 0;

  public partner = "";
  public child1 = "";
  public child2 = "";
  public child3 = "";
  public child4 = "";

  private members$:Observable<Member[]>;

  constructor( private storeService: MemberStoreService) { }

  ngOnInit(): void {
    // Partner lesen wenn vorhanden
    if (this.partner_id > 0) {
      this.members$ = this.storeService.getByMemberId(this.partner_id);
      this.members$.subscribe(m  => {
        if(m[0] != undefined)
          this.partner = m[0].Firstname + " " + m[0].Familyname
        }
      );
    }

    // Kinder lesen wenn vorhanden
    console.log("CHILD",this.has_child);
    if (this.has_child == 1) {
      this.members$= this.storeService.getByChildrens(this.mem_id);
      this.members$.subscribe(m  => {
        if(m[0] != undefined)
          if (m.length > 0)
            this.child1 = m[0].Firstname + " " + m[0].Familyname;
          if (m.length > 1)
            this.child2 = m[1].Firstname + " " + m[1].Familyname;
          if (m.length > 2)
            this.child3 = m[2].Firstname + " " + m[2].Familyname;
          if (m.length > 3)
            this.child3 = m[3].Firstname + " " + m[3].Familyname;
        }
      );
    }
  }
}
