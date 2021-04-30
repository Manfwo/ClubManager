import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { WorkListComponent } from './work-list/work-list.component';
// import { MemberDetailsComponent } from './member-details/member-details.component';

const routes: Routes = [
 {
    path: '',
    component: WorkListComponent
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
export class WorkRoutingModule { }
