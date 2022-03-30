import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MyMaterialModule  } from '../material.module';
import { MemberViewComponent } from './member-view/member-view.component';
import { MemberDetailsComponent } from './member-details/member-details.component';
import { MemberCreateComponent } from './member-create/member-create.component';
import { MemberTableComponent } from './member-table/member-table.component';
import { MemberColumnsComponent } from './member-columns/member-columns.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    MemberViewComponent,
    MemberDetailsComponent,
    MemberTableComponent,
    MemberColumnsComponent,
    MemberCreateComponent,
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
