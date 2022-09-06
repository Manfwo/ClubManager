import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { Member } from '../member';
import { MemberStoreService } from '../member-store.service';
import { ActivityStoreService } from 'src/app/activity/activity-store.service';

@Component({
  selector: 'cl-member-delete',
  templateUrl: './member-delete.component.html',
  styleUrls: ['./member-delete.component.scss']
})

export class MemberDeleteComponent implements OnInit {

  public delForm: FormGroup;
  public Firstname:string;
  public Familyname:string;
  private result$: Observable<string>;
  private member: Member;

  constructor(
      @Inject(MAT_DIALOG_DATA) public data: any,
      public fb: FormBuilder,
      private ms: MemberStoreService,
      private as: ActivityStoreService)
    {
    this.Firstname = data.member.Firstname;
    this.Familyname = data.member.Familyname;
    this.member = data.member;
  }

  ngOnInit(): void {
      this.delForm= new FormGroup({
      });
  }

  submitForm(): void {
    // Mitglied löschen
    this.result$ = this.ms.remove(this.member.Id);
    this.result$.subscribe(message  => console.log(message));
    // Aktivendaten eines Mitgliedes
    this.result$ = this.as.removeMember(this.member.Id);
    this.result$.subscribe(message  => console.log(message));
  }

  onCancel(): void {
    //console.log("DIALOG_CANCEL");
  }
}
