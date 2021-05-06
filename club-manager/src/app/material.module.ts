import { NgModule } from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatTableModule } from '@angular/material/table';
import { MatDividerModule } from '@angular/material/divider';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatSelectModule } from '@angular/material/select';
import { MatOptionModule } from '@angular/material/core';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatFormFieldModule } from '@angular/material/form-field';


@NgModule({
imports: [
          MatSidenavModule,
          MatButtonModule,
          MatToolbarModule,
          MatIconModule,
          MatMenuModule,
          MatDividerModule,
          MatProgressSpinnerModule,
          MatButtonToggleModule,
          MatCardModule,
          MatInputModule,
          MatFormFieldModule,
          MatTableModule
        ],

exports: [
          MatSidenavModule,
          MatButtonModule,
          MatToolbarModule,
          MatIconModule,
          MatMenuModule,
          MatDividerModule,
          MatProgressSpinnerModule,
          MatButtonToggleModule,
          MatCardModule,
          MatInputModule,
          MatFormFieldModule,
          MatTableModule
        ],

})

export  class  MyMaterialModule { }
