
import { MemberGroupsComponent } from './members/member-groups/member-groups.component';
import { MemberColumnsComponent } from './members/member-columns/member-columns.component';
import { MemberViewComponent } from './members/member-view/member-view.component';
import { MemberCreateComponent } from './members/member-create/member-create.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './general/login/login.component';
import { DashboardComponent } from './dashboard/dashboard/dashboard.component';
import { SettingsComponent } from './general/settings/settings.component';
import { ReportListComponent } from './reports/report-list/report-list.component';
import { StatisticComponent } from './statistic/statistic/statistic.component';
import { PageNotFoundComponent } from './general/page-not-found/page-not-found.component';
import { SidebarEmptyComponent } from './general/sidebar-empty/sidebar-empty.component';
import { AuthGuard } from './general/auth/auth.guard';

const routes: Routes = [

// Allgemein
{  path: '', redirectTo: 'login', pathMatch: 'full' },
{  path: 'login', component: LoginComponent },
{  path: 'dashboard',  component: DashboardComponent, canActivate : [AuthGuard]},
{  path: 'settings',  component: SettingsComponent },
{  path: 'close',  outlet: 'sidebar', component: SidebarEmptyComponent },

// Member Bereich
{ path: 'mem-create', component: MemberCreateComponent, canActivate : [AuthGuard] },
{ path: 'members', component: MemberViewComponent, canActivate : [AuthGuard] },
{ path: 'mem-columns', outlet: 'sidebar', component: MemberColumnsComponent },
{ path: 'mem-groups', outlet: 'sidebar', component: MemberGroupsComponent },

{
  path: 'groups',
  loadChildren: () => import('./groups/group.module').then(g => g.GroupModule)
},
{
  path: 'activities',
  loadChildren: () => import('./activity/activity.module').then(a => a.ActivityModule)
},
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
