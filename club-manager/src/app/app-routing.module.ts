import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { LoginComponent } from './general/login/login.component';
import { DashboardComponent } from './dashboard/dashboard/dashboard.component';
import { SettingsComponent } from './general/settings/settings.component';
import { ReportListComponent } from './reports/report-list/report-list.component';
import { StatisticComponent } from './statistic/statistic/statistic.component';
import { PageNotFoundComponent } from './general/page-not-found/page-not-found.component';
import { AuthGuard } from './general/auth/auth.guard';

const routes: Routes = [
{
  path: '',
  redirectTo: 'login',
  pathMatch: 'full'
},
{
  path: 'login',
  component: LoginComponent
},
{
  path: 'dashboard',
  component: DashboardComponent, canActivate : [AuthGuard]
},
{
  path: 'settings',
  component: SettingsComponent
},
{
  path: 'members',
  loadChildren: () => import('./members/member.module').then(m => m.MemberModule)
},
{
  path: 'groups',
  loadChildren: () => import('./groups/group.module').then(g => g.GroupModule),
},
{
  path: 'activities',
  loadChildren: () => import('./activities/activity.module').then(a => a.ActivityModule)
},
{
  path: 'work',
  loadChildren: () => import('./works/work.module').then(w => w.WorkModule)
},
{
  path: 'reports',
  component: ReportListComponent, canActivate : [AuthGuard]
},
{
  path: 'statistic',
  component: StatisticComponent, canActivate : [AuthGuard]
},
{
  path: '**',
  component: PageNotFoundComponent
}
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
