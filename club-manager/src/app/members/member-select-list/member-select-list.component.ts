import {SelectionModel} from '@angular/cdk/collections';
import {Component, OnInit} from '@angular/core';
import {MatTableDataSource} from '@angular/material/table';
import { Member } from '../member';

@Component({
  selector: 'cl-member-select-list',
  templateUrl: './member-select-list.component.html',
  styleUrls: ['./member-select-list.component.scss']
})

export class MemberSelectListComponent implements OnInit {

  constructor(){
  }

  ngOnInit(): void {
  }

  displayedColumns: string[] = ['select', 'position', 'name', 'weight', 'symbol'];
  //dataSource = new MatTableDataSource<Member>;
  selection = new SelectionModel<Member[]>(true, []);


  /** The label for the checkbox on the passed row
  checkboxLabel(row?: Member): string {
    if (!row) {
      return `${this.isAllSelected() ? 'deselect' : 'select'} all`;
    }
    //return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.Id + 1}`;
  }
  */
}

