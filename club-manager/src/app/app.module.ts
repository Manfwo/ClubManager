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

@NgModule({
  declarations: [
    AppComponent,
    ThemeSwitchComponent,
    SettingsComponent,
    DashboardComponent,
    PageNotFoundComponent,
    ReportListComponent,
    StatisticComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    MyMaterialModule,
    ReactiveFormsModule
  ],
  providers: [{ provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi: true }, AuthGuard ],
  bootstrap: [AppComponent]
})
export class AppModule { }
