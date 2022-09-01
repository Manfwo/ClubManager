import { ActivityViewComponent } from './activity-view/activity-view.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivityRoutingModule } from './activity-routing.module';
import { ActivityListComponent } from './activity-list/activity-list.component';
import { ActivityColumnsComponent } from './activity_columns/activity-columns.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MyMaterialModule } from '../material.module';
import { ActivityCreateComponent } from './activity-create/activity-create.component';
import { ActivityTableComponent } from './activity-table/activity-table.component';

    //ActivityViewComponent,
    //
       //
@NgModule({
  declarations: [
    ActivityViewComponent,
    //ActivityListComponent,
    ActivityColumnsComponent,
    ActivityCreateComponent,
    ActivityTableComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MyMaterialModule,
    ActivityRoutingModule
  ]

})
export class ActivityModule { }
