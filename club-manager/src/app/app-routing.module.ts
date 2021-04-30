import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { DashboardComponent } from './dashboard/dashboard/dashboard.component';
import { SettingsComponent } from './general/settings/settings.component';
import { ReportListComponent } from './reports/report-list/report-list.component';
import { StatisticComponent } from './statistic/statistic/statistic.component';
import { PageNotFoundComponent } from './general/page-not-found/page-not-found.component';

const routes: Routes = [
{
  path: '',
  redirectTo: 'dashboard',
  pathMatch: 'full'
},
{
  path: 'dashboard',
  component: DashboardComponent
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
  component: ReportListComponent
},
{
  path: 'statistic',
  component: StatisticComponent
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
