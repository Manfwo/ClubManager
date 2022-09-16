import { ActivityViewComponent } from './activity-view/activity-view.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivityListComponent } from './activity-list/activity-list.component';
import { ActivityColumnsComponent } from './activity_columns/activity-columns.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MyMaterialModule } from '../material.module';
import { ActivityCreateComponent } from './activity-create/activity-create.component';
import { ActivityTableComponent } from './activity-table/activity-table.component';
import { ActivityUpdateComponent } from './activity-update/activity-update.component';

    //ActivityViewComponent,
    //
       //
@NgModule({
  declarations: [
    ActivityViewComponent,
    //ActivityListComponent,
    ActivityColumnsComponent,
    ActivityCreateComponent,
    ActivityTableComponent,
   //ActivityUpdateComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MyMaterialModule,
  ]

})
export class ActivityModule { }
