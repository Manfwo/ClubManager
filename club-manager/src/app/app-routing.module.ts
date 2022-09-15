import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './_general/login/login.component';
import { DashboardComponent } from './dashboard/dashboard/dashboard.component';
import { SettingsComponent } from './_general/settings/settings/settings.component';

import { MemberColumnsComponent } from './members/member-columns/member-columns.component';
import { MemberViewComponent } from './members/member-view/member-view.component';
import { MemberCreateComponent } from './members/member-create/member-create.component';
import { MemberUpdateComponent } from './members/member-update/member-update.component';
import { MemberFilterComponent } from './members/member-filter/member-filter.component';

import { ReportListComponent } from './reports/report-list/report-list.component';
import { StatisticComponent } from './statistic/statistic/statistic.component';
import { PageNotFoundComponent } from './_general/page-not-found/page-not-found.component';
import { SidebarEmptyComponent } from './_general/sidebar-empty/sidebar-empty.component';
import { AuthGuard } from './_general/auth/auth.guard';
import { ActivityViewComponent } from './activity/activity-view/activity-view.component';
import { ActivityCreateComponent } from './activity/activity-create/activity-create.component';
import { ActivityColumnsComponent } from './activity/activity_columns/activity-columns.component';


const routes: Routes = [

// Allgemein
{  path: '', redirectTo: 'login', pathMatch: 'full' },
{  path: 'login', component: LoginComponent },
{  path: 'dashboard',  component: DashboardComponent, canActivate : [AuthGuard]},
{  path: 'settings',  component: SettingsComponent },
{  path: 'close',  outlet: 'sidebar', component: SidebarEmptyComponent },

// Member Bereich
{ path: 'members', component: MemberViewComponent, canActivate : [AuthGuard] },
{ path: 'mem-create', component: MemberCreateComponent, canActivate : [AuthGuard] },
{ path: 'mem-update', component: MemberUpdateComponent, canActivate : [AuthGuard] },
{ path: 'mem-columns', outlet: 'sidebar', component: MemberColumnsComponent },
{ path: 'mem-filter', outlet: 'sidebar', component: MemberFilterComponent },
{
  path: 'groups',
  loadChildren: () => import('./groups/group.module').then(g => g.GroupModule)
},
{ path: 'activities', component: ActivityViewComponent, canActivate : [AuthGuard] },
{ path: 'act-create', component: ActivityCreateComponent, canActivate : [AuthGuard] },
{ path: 'act-update', component: ActivityCreateComponent, canActivate : [AuthGuard] },
{ path: 'act-columns', outlet: 'sidebar', component: ActivityColumnsComponent },
{
  path: 'works',
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
  imports: [RouterModule.forRoot(routes,{ enableTracing: false , scrollPositionRestoration: 'enabled'})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
