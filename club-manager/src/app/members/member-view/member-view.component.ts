import { Component,  } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'cl-member-view',
  templateUrl: './member-view.component.html',
  styleUrls: ['./member-view.component.scss']
})

export class MemberViewComponent  {

  public search = '';
  constructor(private router : Router, private route: ActivatedRoute ) {

   }


}
