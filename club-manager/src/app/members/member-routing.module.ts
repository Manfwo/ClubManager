import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MemberListComponent } from './member-list/member-list.component';
// import { MemberDetailsComponent } from './member-details/member-details.component';

const routes: Routes = [
  {
    path: '',
    component: MemberListComponent
  }
   /* {
  {
    path: ':id',
    component: MemberDetailsComponent
  }*/
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: []
})
export class MembersRoutingModule { }
