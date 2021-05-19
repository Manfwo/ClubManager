import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MyMaterialModule  } from '../material.module';
import { MembersRoutingModule } from './member-routing.module';
import { MemberListComponent } from './member-list/member-list.component';
import { MemberDetailsComponent } from './member-details/member-details.component';
import { MemberTableComponent } from './member-table/member-table.component';

@NgModule({
  declarations: [
    MemberListComponent,
    MemberDetailsComponent,
    MemberTableComponent
  ],
  imports: [
    CommonModule,
    MyMaterialModule,
    MembersRoutingModule
  ],
  providers: [
    MemberTableComponent,
   ]

})
export class MemberModule { }
