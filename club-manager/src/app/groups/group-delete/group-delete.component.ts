import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { Group } from '../group';
import { GroupStoreService } from '../group-store.service';

@Component({
  selector: 'cl-group-delete',
  templateUrl: './group-delete.component.html',
  styleUrls: ['./group-delete.component.scss']
})
export class GroupDeleteComponent implements OnInit {

  public delForm: FormGroup;
  public groupname:string;
  private result$: Observable<string>;
  private group: Group;

  constructor(
      @Inject(MAT_DIALOG_DATA) public data: any,
      public fb: FormBuilder,
      private StoreService: GroupStoreService)
    {
    this.groupname = data.group.Name;
    this.group = data.group;
  }

  ngOnInit(): void {
      this.delForm= new FormGroup({
      });
  }

  submitForm(): void {
    // Gruppe löschen
    this.result$ = this.StoreService.remove(this.group.Id);
    this.result$.subscribe(message  => {
      // Gruppen-Mitglieder löschen
      this.result$ = this.StoreService.removeMember(this.group.Id);
      this.result$.subscribe(message  => {
          console.log(message)});
    });
  }

  onCancel(): void {
    //console.log("DIALOG_CANCEL");
  }
}

