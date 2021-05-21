import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from '../general/auth/auth.guard';

import { MemberListComponent } from './member-list/member-list.component';
import { MemberColumnsComponent } from './member-columns/member-columns.component';
// import { MemberDetailsComponent } from './member-details/member-details.component';

const routes: Routes = [
  {
    path: '',
    component: MemberListComponent, canActivate : [AuthGuard]
  },
  {
    path: 'columns',
    component: MemberColumnsComponent, outlet: 'sidebar', canActivate : [AuthGuard]
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
