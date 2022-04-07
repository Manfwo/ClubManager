import { MemberTransferService } from './../member-transfer.service';
import { Component, OnInit } from '@angular/core';
import { Validators } from '@angular/forms';
import { FormGroup, FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { Member } from '../member';
import { MemberRaw } from '../member-raw';
import { MemberStoreService } from '../member-store.service';
import { HeaderService } from './../../app-header.service';

@Component({
  selector: 'cl-member-update',
  templateUrl: './member-update.component.html',
  styleUrls: ['./member-update.component.scss']
})
export class MemberUpdateComponent implements OnInit {

  // Fields
  member: MemberRaw = new MemberRaw;
  myForm: FormGroup;
  updateflag: boolean = false;
  result$: Observable<string>;
  memberIn: Member;
  recordId: number;
  mode: number = 1;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private ms: MemberStoreService,
    private sh: HeaderService,
    private mt: MemberTransferService,
  ) { }

  ngOnInit(): void {
    // Member übernehmen
    this.mt.sharedMember.subscribe(value => {console.log('MEMBER',value);this.memberIn= value});

    // für History
    this.mode = 1;
    this.recordId = this.memberIn.Id;

    this.myForm = new FormGroup({
      alias: new FormControl(''),
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
      bronze: new FormControl('',[Validators.min(1955),Validators.max(2050),Validators.pattern('^[0-9]*$')]),
      silver: new FormControl('',[Validators.min(1955),Validators.max(2050),Validators.pattern('^[0-9]*$')]),
      gold: new FormControl('',[Validators.min(1955),Validators.max(2050),Validators.pattern('^[0-9]*$')]),
      active44: new FormControl('',[Validators.min(1955),Validators.max(2050),Validators.pattern('^[0-9]*$')]),
      active55: new FormControl('',[Validators.min(1955),Validators.max(2050),Validators.pattern('^[0-9]*$')]),
      active66: new FormControl('',[Validators.min(1955),Validators.max(2050),Validators.pattern('^[0-9]*$')]),
      active77: new FormControl('',[Validators.min(1955),Validators.max(2050),Validators.pattern('^[0-9]*$')]),
      active88: new FormControl('',[Validators.min(1955),Validators.max(2050),Validators.pattern('^[0-9]*$')]),
      goldlion: new FormControl('',[Validators.min(1955),Validators.max(2050),Validators.pattern('^[0-9]*$')]),
      goldlionnr: new FormControl('',Validators.pattern('^[0-9]*$')),
      goldlionbrilliant: new FormControl('',[Validators.min(1955),Validators.max(2050),Validators.pattern('^[0-9]*$')]),
      tributmember: new FormControl('',[Validators.min(1955),Validators.max(2050),Validators.pattern('^[0-9]*$')]),

      comment: new FormControl(''),
    });
    // Set values
    if (this.memberIn != undefined) {
      this.myForm.get('alias').patchValue(this.memberIn.Alias);
      if (this.memberIn.Gender == "Herr")
        this.myForm.get('gender').patchValue('m');
      else
        this.myForm.get('gender').patchValue('w');
      this.myForm.get('title').patchValue(this.memberIn.Title);
      this.myForm.get('firstname').patchValue(this.memberIn.Firstname);
      this.myForm.get('familyname').patchValue(this.memberIn.Familyname,);
      this.myForm.get('street').patchValue(this.memberIn.Street);
      this.myForm.get('zipcode').patchValue(this.memberIn.Zipcode);
      this.myForm.get('city').patchValue(this.memberIn.City);
      this.myForm.get('phone').patchValue(this.memberIn.Phone);
      this.myForm.get('email').patchValue(this.memberIn.Mail);
      let parts = this.memberIn.Birthday.split(".");
      this.myForm.get('birthday').patchValue(new Date(Date.UTC(Number(parts[2]),Number(parts[1])-1,Number(parts[0]), 0, 0, 0)));
      this.myForm.get('birthname').patchValue(this.memberIn.Birthname);
      parts = this.memberIn.Entryday.split(".");
      this.myForm.get('entryday').patchValue(new Date(Date.UTC(Number(parts[2]),Number(parts[1])-1,Number(parts[0]), 0, 0, 0)));
      if (this.memberIn.AddressInvalid == "ja")
        this.myForm.get('addressinvalid').patchValue(1);
      else
        this.myForm.get('addressinvalid').patchValue(0);
      if (this.memberIn.Flag == "ja")
        this.myForm.get('flag').patchValue(1);
      else
        this.myForm.get('flag').patchValue(0);

      if (this.memberIn.Active == "ja")
        this.myForm.get('active').patchValue(1);
      else
        this.myForm.get('active').patchValue(0);
      this.myForm.get('activeyears').patchValue(this.memberIn.ActiveYears);
      this.myForm.get('activepoints').patchValue(this.memberIn.ActivePoints);
      if (this.memberIn.BrokenYears== "ja")
        this.myForm.get('brokenyears').patchValue(1);
      else
        this.myForm.get('brokenyears').patchValue(0);
      this.myForm.get('bronze').patchValue(this.memberIn.Bronze);
      this.myForm.get('silver').patchValue(this.memberIn.Silver);
      this.myForm.get('gold').patchValue(this.memberIn.Gold);
      this.myForm.get('active44').patchValue(this.memberIn.Active4x11);
      this.myForm.get('active55').patchValue(this.memberIn.Active5x11);
      this.myForm.get('active66').patchValue(this.memberIn.Active6x11);
      this.myForm.get('active77').patchValue(this.memberIn.Active7x11);
      this.myForm.get('active77').patchValue(this.memberIn.Active8x11);
      this.myForm.get('goldlion').patchValue(this.memberIn.GoldLion);
      this.myForm.get('goldlionnr').patchValue(this.memberIn.GoldLionNumber);
      this.myForm.get('goldlionbrilliant').patchValue(this.memberIn.GoldLionBrilliant);
      this.myForm.get('tributmember').patchValue(this.memberIn.TributeMember);
    }
  }

  public getAlias(): void {
    console.log('GET-ALIAS');
  }

  public onUpdate(): void {
    this.updateflag =true;
  }

  public onCancel():  void {
    this.updateflag = false;
  }

  onFormSubmit() {
    this.member.Id = this.memberIn.Id
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

    console.log('UPDATE_MEMBER',this.myForm.value);
    if (this.updateflag) {
      this.result$ = this.ms.update(this.member)
      this.result$.subscribe(message  => console.log(message));
      this.myForm.reset();
      this.sh.nextMessage(1);
      this.router.navigate(['../', 'members'], { relativeTo: this.route });
    }
    else {
      this.myForm.reset();
      this.sh.nextMessage(1);
      this.router.navigate(['../', 'members'], { relativeTo: this.route });
    }
  }
}
