import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MyMaterialModule  } from '../material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MemberViewComponent } from './member-view/member-view.component';
import { MemberCreateComponent } from './member-create/member-create.component';
import { MemberUpdateComponent } from './member-update/member-update.component';
import { MemberTableComponent } from './member-table/member-table.component';
import { MemberColumnsComponent } from './member-columns/member-columns.component';
import { MemberDeleteComponent } from './member-delete/member-delete.component';
import { MemberResignComponent } from './member-resign/member-resign.component';
import { MemberPartnerChildComponent } from './member-partner-child/member-partner-child.component';
import { MemberFilterComponent } from './member-filter/member-filter.component';

@NgModule({
  declarations: [
    MemberViewComponent,
    MemberTableComponent,
    MemberColumnsComponent,
    MemberFilterComponent,
    MemberCreateComponent,
    MemberResignComponent,
    MemberDeleteComponent,
    MemberCreateComponent,
    //MemberPartnerChildComponent,
    //MemberUpdateComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MyMaterialModule,
  ],
  providers: [
    MemberTableComponent,
   ]

})
export class MemberModule { }
