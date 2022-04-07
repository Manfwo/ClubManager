import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from '../_general/auth/auth.guard';
import { GroupListComponent } from './group-list/group-list.component';


const routes: Routes = [
 {
    path: '',
    component: GroupListComponent, canActivate : [AuthGuard]
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
