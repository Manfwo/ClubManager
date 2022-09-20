import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MyMaterialModule  } from '../material.module';

import { GroupListComponent } from './group-list/group-list.component';
import { GroupViewComponent } from './group-view/group-view.component';
import { GroupTableComponent } from './group-table/group-table.component';
import { GroupCreateComponent } from './group-create/group-create.component';
import { GroupDeleteComponent } from './group-delete/group-delete.component';

@NgModule({
  declarations: [
    GroupListComponent,
    GroupViewComponent,
    GroupTableComponent,
    GroupCreateComponent,
    GroupDeleteComponent,
  ],
  imports: [
    CommonModule,
    MyMaterialModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  providers: [
    GroupTableComponent,
   ]
})
export class GroupModule { }
