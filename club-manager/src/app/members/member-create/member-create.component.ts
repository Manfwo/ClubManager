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

  @Output() submitMember = new EventEmitter<MemberRaw>();
  @Output() submitMemberNew = new EventEmitter<MemberRaw>();

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private ms: MemberStoreService,
    private sh:HeaderService
  ) { }

  ngOnInit(): void {

    this.myForm = new FormGroup({

        gender: new FormControl('',Validators.required),
        title: new FormControl(''),
        firstname: new FormControl('',Validators.required),
        familyname: new FormControl('',Validators.required),
        street: new FormControl('',Validators.required),
        zipcode: new FormControl('',[Validators.required,Validators.minLength(5)]),
        city: new FormControl('',Validators.required),
        email: new FormControl('',Validators.email),
        phone: new FormControl('',[Validators.pattern('[0-9]'),Validators.minLength(4)]),
        birthday: new FormControl('',Validators.required),
        age: new FormControl(''),
        birthname: new FormControl(''),
        entryday: new FormControl('',Validators.required),
        addressinvalid:new FormControl(false),
        flag:new FormControl(false),

        active: new FormControl(false),
        activeyears: new FormControl('',Validators.pattern("^((\\+91-?)|0)?[0-9]{10}$")),
        brokenyears: new FormControl(false),
        activepoints: new FormControl('',Validators.pattern('[0-9]')),
        bronze: new FormControl('',[Validators.pattern('[0-9]'),Validators.min(1955),Validators.max(2050)]),
        silver: new FormControl('',[Validators.pattern('[0-9]'),Validators.min(1955),Validators.max(2050)]),
        gold: new FormControl('',[Validators.pattern('[0-9]'),Validators.min(1955),Validators.max(2050)]),
        active44: new FormControl('',[Validators.pattern('[0-9]'),Validators.min(1955),Validators.max(2050)]),
        active55: new FormControl('',[Validators.pattern('[0-9]'),Validators.min(1955),Validators.max(2050)]),
        active66: new FormControl('',[Validators.pattern('[0-9]'),Validators.min(1955),Validators.max(2050)]),
        active77: new FormControl('',[Validators.pattern('[0-9]'),Validators.min(1955),Validators.max(2050)]),
        active88: new FormControl('',[Validators.pattern('[0-9]'),Validators.min(1955),Validators.max(2050)]),
        goldlion: new FormControl('',[Validators.pattern('[0-9]'),Validators.min(1955),Validators.max(2050)]),
        goldlionnr: new FormControl('',Validators.pattern('[0-9]')),
        goldlionbrilliant: new FormControl('',[Validators.pattern('[0-9]'),Validators.min(1955),Validators.max(2050)]),
        tributmember: new FormControl(''),

        comment: new FormControl(''),
      });
  }

  public onSave(): void {
    console.log('SAVE');
    this.newflag = false;
  }

  public onSaveNew():  void {
    console.log('NEW');
    this.newflag = true;
  }

  onFormSubmit() {
    this.member.Gender = this.myForm.get('gender').value;
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
    this.member.TributeMember= this.myForm.get('tributmember').value;
    this.member.Comment = this.myForm.get('comment').value;

    console.log('CREATE_MEMBER',this.myForm.value);
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
