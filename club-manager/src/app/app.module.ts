import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { MyMaterialModule  } from './material.module';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ThemeSwitchComponent } from './general/theme-switch/theme-switch.component';
import { SettingsComponent } from './general/settings/settings.component';
import { DashboardComponent } from './dashboard/dashboard/dashboard.component';
import { PageNotFoundComponent } from './general/page-not-found/page-not-found.component';
import { ReportListComponent } from './reports/report-list/report-list.component';
import { StatisticComponent } from './statistic/statistic/statistic.component';

@NgModule({
  declarations: [
    AppComponent,
    ThemeSwitchComponent,
    SettingsComponent,
    DashboardComponent,
    PageNotFoundComponent,
    ReportListComponent,
    StatisticComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MyMaterialModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
