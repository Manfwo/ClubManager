import { MemberDeleteComponent } from './member-delete/member-delete.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MyMaterialModule  } from '../material.module';
import { MemberViewComponent } from './member-view/member-view.component';
import { MemberCreateComponent } from './member-create/member-create.component';
import { MemberUpdateComponent } from './member-update/member-update.component';
import { MemberTableComponent } from './member-table/member-table.component';
import { MemberColumnsComponent } from './member-columns/member-columns.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MemberResignComponent } from './member-resign/member-resign.component';

@NgModule({
  declarations: [
    MemberViewComponent,
    MemberTableComponent,
    MemberColumnsComponent,
    MemberCreateComponent,
    MemberResignComponent,
    MemberDeleteComponent,
    MemberCreateComponent,
   // MemberUpdateComponent,
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
