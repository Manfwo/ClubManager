


import { MemberModule } from './members/member.module';
import { GroupModule } from './groups/group.module';
import { ActivityModule } from './activity/activity.module';
import { NgModule} from '@angular/core';

import { MAT_DATE_LOCALE} from '@angular/material/core';
import { BrowserModule } from '@angular/platform-browser';
import { MyMaterialModule  } from './material.module';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { TokenInterceptor } from './_shared/token.interceptor';
import { ThemeSwitchComponent } from './_general/theme-switch/theme-switch.component';
import { ReactiveFormsModule } from '@angular/forms';
import { AuthGuard } from './_general/auth/auth.guard';
import { LoginComponent } from './_general/login/login.component';
import { SettingsComponent } from './_general/settings/settings/settings.component';
import { DashboardComponent } from './dashboard/dashboard/dashboard.component';
import { PageNotFoundComponent } from './_general/page-not-found/page-not-found.component';
import { ReportListComponent } from './reports/report-list/report-list.component';
import { StatisticComponent } from './statistic/statistic/statistic.component';
import { HistoryListComponent } from './_general/history/history-list/history-list.component';

import { MemberUpdateComponent } from './members/member-update/member-update.component';
import { MemberPartnerChildComponent } from './members/member-partner-child/member-partner-child.component';
import { MemberParentComponent } from './members/member-parent/member-parent.component';
import { ActivityListComponent } from './activity/activity-list/activity-list.component';
import { ActivityUpdateComponent } from './activity/activity-update/activity-update.component';
import { GroupCreateHeaderComponent } from './groups/group-create-header/group-create-header.component';
import { GroupUpdateHeaderComponent } from './groups/group-update-header/group-update-header.component';
import { GroupFooterPaginationComponent } from './groups/group-footer-pagination/group-footer-pagination.component';
import { GroupUpdateComponent } from './groups/group-update/group-update.component';

// Header Componenten
import { MemberHeaderComponent } from './members/member-header/member-header.component';
import { MemberCreateHeaderComponent } from './members/member-create-header/member-create-header.component';
import { MemberUpdateHeaderComponent } from './members/member-update-header/member-update-header.component';
import { ActivityHeaderComponent } from './activity/activity-header/activity-header.component';
import { ActivityCreateHeaderComponent } from './activity/activity-create-header/activity-create-header.component';
import { ActivityUpdateHeaderComponent } from './activity/activity-update-header/activity-update-header.component';
import { GroupHeaderComponent } from './groups/group-header/group-header.component';
import { StatisticHeaderComponent} from './statistic/statistic-header/statistic-header.component';
import { DashboardHeaderComponent } from './dashboard/dashboard-header/dashboard-header.component';
import { ReportHeaderComponent } from './reports/report-header/report-header.component';
import { WorkHeaderComponent } from './works/work-header/work-header.component';
import { SettingsHeaderComponent } from  './_general/settings/settings-header/settings-header.component';
// Sidebar
import { SidebarEmptyComponent } from './_general/sidebar-empty/sidebar-empty.component';
// Footer
import { FooterEmptyComponent } from './_general/footer-empty/footer-empty/footer-empty.component';
import { MemberFooterPaginationComponent } from './members/member-footer-pagination/member-footer-pagination.component';
import { ActivityFooterPaginationComponent } from './activity/activity-footer-pagination/activity-footer-pagination.component';

import { GroupMemberFooterPaginationComponent } from './groups/group-mem-footer-pagination/group-mem-footer-pagination.component';

@NgModule({
  declarations: [
    AppComponent,
    ThemeSwitchComponent,
    SettingsComponent,
    DashboardComponent,
    PageNotFoundComponent,
    ReportListComponent,
    StatisticComponent,
    LoginComponent,
    StatisticHeaderComponent,
    DashboardHeaderComponent,
    ReportHeaderComponent,
    WorkHeaderComponent,
    SidebarEmptyComponent,
    HistoryListComponent,
    SettingsHeaderComponent,
    FooterEmptyComponent,

    MemberHeaderComponent,
    MemberCreateHeaderComponent,
    MemberUpdateHeaderComponent,
    MemberFooterPaginationComponent,
    MemberUpdateComponent,
    MemberPartnerChildComponent,
    MemberParentComponent,

    GroupHeaderComponent,
    GroupCreateHeaderComponent,
    GroupUpdateHeaderComponent,
    GroupUpdateComponent,
    GroupFooterPaginationComponent,
    GroupMemberFooterPaginationComponent,

    ActivityHeaderComponent,
    ActivityCreateHeaderComponent,
    ActivityUpdateHeaderComponent,
    ActivityUpdateComponent,
    ActivityFooterPaginationComponent,
    ActivityListComponent,

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    MyMaterialModule,
    ReactiveFormsModule,
    MemberModule,
    ActivityModule,
    GroupModule
  ],
  providers: [{ provide: MAT_DATE_LOCALE, useValue: 'de-DE'},
              { provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi: true }, AuthGuard ],
  bootstrap: [AppComponent]
})
export class AppModule { }
