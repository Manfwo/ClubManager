import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MembersRoutingModule } from './member-routing.module';
import { MemberListComponent } from './member-list/member-list.component';


@NgModule({
  declarations: [
    MemberListComponent
  ],
  imports: [
    CommonModule,
    MembersRoutingModule
  ]
})
export class MemberModule { }
