import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MembersRoutingModule } from './member-routing.module';
import { MemberListComponent } from './member-list/member-list.component';
import { MemberListItemComponent } from './member-list-item/member-list-item.component';
import { MemberDetailsComponent } from './member-details/member-details.component';

@NgModule({
  declarations: [
    MemberListComponent,
    MemberListItemComponent,
    MemberDetailsComponent
  ],
  imports: [
    CommonModule,
    MembersRoutingModule
  ]
})
export class MemberModule { }
