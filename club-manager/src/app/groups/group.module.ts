import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GroupRoutingModule } from './group-routing.module';
import { GroupListComponent } from './group-list/group-list.component';
import { MyMaterialModule  } from '../material.module';

@NgModule({
  declarations: [
    GroupListComponent

  ],
  imports: [
    CommonModule,
    GroupRoutingModule,
    MyMaterialModule
  ]
})
export class GroupModule { }
