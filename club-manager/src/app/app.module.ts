import { MemberModule } from './members/member.module';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { MyMaterialModule  } from './material.module';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { TokenInterceptor } from './_shared/token.interceptor';
import { ThemeSwitchComponent } from './general/theme-switch/theme-switch.component';
import { LoginComponent } from './general/login/login.component';
import { SettingsComponent } from './general/settings/settings.component';
import { DashboardComponent } from './dashboard/dashboard/dashboard.component';
import { PageNotFoundComponent } from './general/page-not-found/page-not-found.component';
import { ReportListComponent } from './reports/report-list/report-list.component';
import { StatisticComponent } from './statistic/statistic/statistic.component';
import { ReactiveFormsModule } from '@angular/forms';
import { AuthGuard } from './general/auth/auth.guard';
import { MemberHeaderComponent } from './members/member-header/member-header.component';
import { StatisticHeaderComponent} from './statistic/statistic-header/statistic-header.component';
import { DashboardHeaderComponent } from './dashboard/dashboard-header/dashboard-header.component';
import { GroupHeaderComponent } from './groups/group-header/group-header.component';
import { ReportHeaderComponent } from './reports/report-header/report-header.component';
import { WorkHeaderComponent } from './works/work-header/work-header.component';
import { ActivityHeaderComponent } from './activity/activity-header/activity-header.component';
import { SidebarEmptyComponent } from './general/sidebar-empty/sidebar-empty.component';

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
    StatisticHeaderComponent,
    DashboardHeaderComponent,
    GroupHeaderComponent,
    ReportHeaderComponent,
    WorkHeaderComponent,
    ActivityHeaderComponent,
    SidebarEmptyComponent
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
  providers: [{ provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi: true }, AuthGuard ],
  bootstrap: [AppComponent]
})
export class AppModule { }
