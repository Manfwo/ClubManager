import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MyMaterialModule  } from '../material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MemberViewComponent } from './member-view/member-view.component';
import { MemberCreateComponent } from './member-create/member-create.component';
import { MemberTableComponent } from './member-table/member-table.component';
import { MemberColumnsComponent } from './member-columns/member-columns.component';
import { MemberDeleteComponent } from './member-delete/member-delete.component';
import { MemberResignComponent } from './member-resign/member-resign.component';
import { MemberFilterComponent } from './member-filter/member-filter.component';
import { MemberSelectListComponent } from './member-select-list/member-select-list.component';

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
    MemberSelectListComponent,
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
