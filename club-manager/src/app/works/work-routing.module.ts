import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from '../_general/auth/auth.guard';
import { WorkListComponent } from './work-list/work-list.component';

const routes: Routes = [
 {
    path: '',
    component: WorkListComponent, canActivate : [AuthGuard]
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
