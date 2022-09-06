import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Validators } from '@angular/forms';
import { FormGroup, FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { MemberRaw } from '../member-raw';
import { MemberStoreService } from '../member-store.service';
import { HeaderService } from './../../app-header.service';
@Component({
  selector: 'cl-member-create',
  templateUrl: './member-create.component.html',
  styleUrls: ['./member-create.component.scss']
})
export class MemberCreateComponent implements OnInit {

  // Fields
  member: MemberRaw = new MemberRaw;
  myForm: FormGroup;
  newflag: boolean = false;
  result$: Observable<string>;
  currentYear: number;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private ms: MemberStoreService,
    private sh:HeaderService
  ) { }

  ngOnInit(): void {

    let currentDate = new Date();
    this.currentYear = currentDate.getFullYear() + 1;

    this.myForm = new FormGroup({

        alias: new FormControl(''),
        externalid: new FormControl('',Validators.required),
        gender: new FormControl('',Validators.required),
        title: new FormControl(''),
        firstname: new FormControl('',Validators.required),
        familyname: new FormControl('',Validators.required),
        street: new FormControl('',Validators.required),
        zipcode: new FormControl('',[Validators.required,Validators.minLength(5)]),
        city: new FormControl('',Validators.required),
        email: new FormControl('',Validators.email),
        phone: new FormControl('',Validators.minLength(4)),
        birthday: new FormControl('',Validators.required),
        age: new FormControl(''),
        birthname: new FormControl(''),
        entryday: new FormControl('',Validators.required),
        addressinvalid:new FormControl(false),
        flag:new FormControl(false),

        active: new FormControl(false),
        activeyears: new FormControl('',[Validators.pattern('^(?:[0-9]?[0-9])?$')]),
        brokenyears: new FormControl(false),
        activepoints: new FormControl('',[Validators.max(99),Validators.pattern('^[0-9,.]*$')]),
        bronze: new FormControl('',[Validators.min(1955),Validators.max(this.currentYear),Validators.pattern('^[0-9]*$')]),
        silver: new FormControl('',[Validators.min(1955),Validators.max(this.currentYear),Validators.pattern('^[0-9]*$')]),
        gold: new FormControl('',[Validators.min(1955),Validators.max(this.currentYear),Validators.pattern('^[0-9]*$')]),
        active44: new FormControl('',[Validators.min(1955),Validators.max(this.currentYear),Validators.pattern('^[0-9]*$')]),
        active55: new FormControl('',[Validators.min(1955),Validators.max(this.currentYear),Validators.pattern('^[0-9]*$')]),
        active66: new FormControl('',[Validators.min(1955),Validators.max(this.currentYear),Validators.pattern('^[0-9]*$')]),
        active77: new FormControl('',[Validators.min(1955),Validators.max(this.currentYear),Validators.pattern('^[0-9]*$')]),
        active88: new FormControl('',[Validators.min(1955),Validators.max(this.currentYear),Validators.pattern('^[0-9]*$')]),
        goldlion: new FormControl('',[Validators.min(1955),Validators.max(this.currentYear),Validators.pattern('^[0-9]*$')]),
        goldlionnr: new FormControl('',Validators.pattern('^[0-9]*$')),
        goldlionbrilliant: new FormControl('',[Validators.min(1955),Validators.max(this.currentYear),Validators.pattern('^[0-9]*$')]),
        goldlionbrilliantnr: new FormControl('',Validators.pattern('^[0-9]*$')),
        tributmember: new FormControl('',[Validators.min(1955),Validators.max(this.currentYear),Validators.pattern('^[0-9]*$')]),

        comment: new FormControl(''),

      });
      // Vorbesetzung
      this.myForm.get('zipcode').patchValue('76761');
      this.myForm.get('city').patchValue('Rülzheim');
  }

  public getAlias(): void {
    let alias = this.myForm.get('familyname').value.substring(0,2) + this.myForm.get('firstname').value.substring(0,3) +  this.myForm.get('street').value.substring(0,2);
    this.myForm.get('alias').patchValue(alias);
  }

  public onSave(): void {
    this.newflag = false;
  }

  public onSaveNew():  void {
    this.newflag = true;
  }

  onFormSubmit() {
    this.member.Alias = this.myForm.get('alias').value;
    this.member.Gender = this.myForm.get('gender').value;
    this.member.ExternalId = this.myForm.get('externalid').value;
    this.member.Title = this.myForm.get('title').value;
    this.member.Firstname = this.myForm.get('firstname').value;
    this.member.Familyname = this.myForm.get('familyname').value;
    this.member.Street = this.myForm.get('street').value;
    this.member.Zipcode = this.myForm.get('zipcode').value;
    this.member.City = this.myForm.get('city').value;
    this.member.Phone = this.myForm.get('phone').value;
    this.member.Mail = this.myForm.get('email').value;
    this.member.Birthday = this.myForm.get('birthday').value;
    this.member.Birthname = this.myForm.get('birthname').value;
    this.member.Entryday = this.myForm.get('entryday').value;

    if (this.myForm.get('addressinvalid').value == true)
      this.member.AddressInvalid = 1;
    else
      this.member.AddressInvalid =0;
    if (this.myForm.get('flag').value == true)
      this.member.Flag = 1;
    else
      this.member.Flag= 0;
    if (this.myForm.get('active').value == true)
      this.member.Active = 1;
    else
      this.member.Active= 0;
    if (this.myForm.get('brokenyears').value == true)
      this.member.BrokenYears =1;
    else
      this.member.BrokenYears= 0;

    this.member.ActiveYears = this.myForm.get('activeyears').value;
    this.member.ActivePoints= this.myForm.get('activepoints').value;
    this.member.Bronze= this.myForm.get('bronze').value;
    this.member.Silver= this.myForm.get('silver').value;
    this.member.Gold= this.myForm.get('gold').value;
    this.member.Active4x11= this.myForm.get('active44').value;
    this.member.Active5x11= this.myForm.get('active55').value;
    this.member.Active6x11= this.myForm.get('active66').value;
    this.member.Active7x11= this.myForm.get('active77').value;
    this.member.Active8x11= this.myForm.get('active88').value;
    this.member.GoldLion= this.myForm.get('goldlion').value;
    this.member.GoldLionNumber= this.myForm.get('goldlionnr').value;
    this.member.GoldLionNBrilliant = this.myForm.get('goldlionbrilliant').value;
    this.member.GoldLionNBrilliantNumber = this.myForm.get('goldlionbrilliantnr').value;
    this.member.TributeMember= this.myForm.get('tributmember').value;
    this.member.Comment = this.myForm.get('comment').value;

    if (this.newflag) {
      this.result$ = this.ms.create(this.member);
      this.result$.subscribe(message  => console.log(message));

      // clear input fields
      this.myForm.reset();
      this.myForm.controls['gender'].setErrors(null);
      this.myForm.controls['firstname'].setErrors(null);
      this.myForm.controls['familyname'].setErrors(null);
      this.myForm.controls['street'].setErrors(null);
      this.myForm.controls['zipcode'].setErrors(null);
      this.myForm.controls['city'].setErrors(null);
      this.myForm.controls['birthday'].setErrors(null);
      this.myForm.controls['entryday'].setErrors(null);
    }
    else {
      this.result$ = this.ms.create(this.member)
      this.result$.subscribe(message  => console.log(message));
      this.myForm.reset();
      this.sh.nextMessage(1);
      this.router.navigate(['../', 'members'], { relativeTo: this.route });
    }
  }
}
