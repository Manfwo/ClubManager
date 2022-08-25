
import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { Member } from '../member';
import { MemberFactory } from '../member-factory';
import { MemberRaw } from '../member-raw';
import { MemberStoreService } from '../member-store.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'cl-resign',
  templateUrl: './resign.component.html',
  styleUrls: ['./resign.component.scss']
})

export class ResignComponent implements OnInit {

  public resignForm: FormGroup;
  public Firstname:string;
  public Familyname:string;
  private result$: Observable<string>;
  private member: Member;

  constructor(
      @Inject(MAT_DIALOG_DATA) public data: any,
      public fb: FormBuilder,
      private ms: MemberStoreService,
      private router: Router,
      private route: ActivatedRoute,
    ) {
    this.Firstname = data.member.Firstname;
    this.Familyname = data.member.Familyname;
    this.member = data.member;
  }

  ngOnInit(): void {
    this.resignForm= new FormGroup({
      resignreason: new FormControl('a',Validators.required),
      resigndate: new FormControl(new Date(),Validators.required)
    });
  }

  submitForm(): void {
    let memberRaw: MemberRaw;
    console.log("DIALOG_DEL");
    console.log(this.resignForm.get('resignreason').value);
    console.log(this.resignForm.get('resigndate').value);
    this.member.Resign = 1;
    this.member.ResignReason = this.resignForm.get('resignreason').value;
    switch (this.resignForm.get('resignreason').value) {
      case 'a':
        this.member.ResignReason ='Austritt';
        break;
      case 'v':
        this.member.ResignReason ='Verstorben';
        break;
      case 'k':
        this.member.ResignReason ='Beitrag';
        break;
    }
    this.member.ResignDate = this.resignForm.get('resigndate').value;

    // Daten speichern
    memberRaw = MemberFactory.toRaw(this.member);
    this.result$ = this.ms.update(memberRaw)
    this.result$.subscribe(message  => console.log(message));

    this.router.navigate(['../', 'members'], { relativeTo: this.route });
  }

  onCancel(): void {
    //console.log("DIALOG_CANCEL");
  }
}
