import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from '../_general/auth/auth.guard';
import { ActivityListComponent } from './activity-list/activity-list.component';

const routes: Routes = [
 {
    path: '',
    component: ActivityListComponent, canActivate : [AuthGuard]
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
export class ActivityRoutingModule { }
