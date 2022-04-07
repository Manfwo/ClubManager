import { MemberModule } from './members/member.module';
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

// Header Componenten
import { MemberHeaderComponent } from './members/member-header/member-header.component';
import { MemberCreateHeaderComponent } from './members/member-create-header/member-create-header.component';
import { MemberUpdateHeaderComponent } from './members/member-update-header/member-update-header.component';
import { MemberUpdateComponent } from './members/member-update/member-update.component';
import { HistoryListComponent } from './_general/history/history-list/history-list.component';
import { StatisticHeaderComponent} from './statistic/statistic-header/statistic-header.component';
import { DashboardHeaderComponent } from './dashboard/dashboard-header/dashboard-header.component';
import { GroupHeaderComponent } from './groups/group-header/group-header.component';
import { ReportHeaderComponent } from './reports/report-header/report-header.component';
import { WorkHeaderComponent } from './works/work-header/work-header.component';
import { ActivityHeaderComponent } from './activity/activity-header/activity-header.component';
import { SettingsHeaderComponent } from  './_general/settings/settings-header/settings-header.component';
// Sidebar
import { SidebarEmptyComponent } from './_general/sidebar-empty/sidebar-empty.component';
// Footer
import { FooterEmptyComponent } from './_general/footer-empty/footer-empty/footer-empty.component';
import { FooterPaginationComponent } from './_general/footer-pagination/footer-pagination/footer-pagination.component';


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
    MemberHeaderComponent,
    MemberCreateHeaderComponent,
    MemberUpdateHeaderComponent,
    StatisticHeaderComponent,
    DashboardHeaderComponent,
    GroupHeaderComponent,
    ReportHeaderComponent,
    WorkHeaderComponent,
    ActivityHeaderComponent,
    SidebarEmptyComponent,
    HistoryListComponent,
    MemberUpdateComponent,
    SettingsHeaderComponent,
    FooterEmptyComponent,
    FooterPaginationComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    MyMaterialModule,
    ReactiveFormsModule,
    MemberModule
  ],
  providers: [{ provide: MAT_DATE_LOCALE, useValue: 'de-DE'},
              { provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi: true }, AuthGuard ],
  bootstrap: [AppComponent]
})
export class AppModule { }
