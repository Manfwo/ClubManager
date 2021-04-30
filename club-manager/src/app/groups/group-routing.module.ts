import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { GroupListComponent } from './group-list/group-list.component';
// import { MemberDetailsComponent } from './member-details/member-details.component';

const routes: Routes = [
 {
    path: '',
    component: GroupListComponent
  } /*,
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
export class GroupRoutingModule { }
