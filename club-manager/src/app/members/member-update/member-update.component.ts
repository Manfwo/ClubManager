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
import { MemberResignComponent } from '../member-resign/member-resign.component';
import { MatDialog } from '@angular/material/dialog';
import { LocalStorageService } from 'src/app/_shared/local-storage.service';
import { MemberDeleteComponent } from '../member-delete/member-delete.component';

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
  currentYear: number;

  // Mitglieder Ablage
  resignList = 'n';
  resignText = false;

  // Daten für History Componente
  mode: number = 1;

  // Daten für Partner-Child Componente
  memberid = 0;
  partnerid = 0;
  haschilds = 0;

  // Daten für Parent Componente
  wid = 0;
  mid = 0;

  constructor(
    private router: Router,
    private localStore: LocalStorageService,
    private route: ActivatedRoute,
    private storeService: MemberStoreService,
    private headerService: HeaderService,
    private mt: MemberTransferService,
    private dialog: MatDialog,
  ) {}

  ngOnInit(): void {
    let currentDate = new Date();
    this.currentYear = currentDate.getFullYear() + 1;

    // Settings für ehemalige Mitglieder lesen
    this.resignList = this.localStore.get('member_resign');
    if ( this.resignList =='y')
      this.resignText = true;
    else
      this.resignText = false;

    // Member übernehmen
    this.mt.sharedMember.subscribe(value => {
      //console.log('MEMBER',value);
      this.memberIn= value
      this.memberid = this.memberIn.Id;
      this.partnerid = this.memberIn.PartnerId;
      this.haschilds = this.memberIn.HasChilds;
      this.partnerid = this.memberIn.PartnerId;
      this.wid = this.memberIn.WParentId;
      this.mid = this.memberIn.MParentId;
    });

    // für History
    this.mode = 1;
    this.recordId = this.memberIn.Id;

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
      birthname: new FormControl(''),
      age: new FormControl('',[Validators.pattern('^(?:[0-9]?[0-9])?$')]),
      entryday: new FormControl('',Validators.required),
      addressinvalid:new FormControl(false),
      flag:new FormControl(false),
      resignday: new FormControl(''),
      resignreason: new FormControl(''),

      active: new FormControl(false),
      memberyears: new FormControl('',[Validators.pattern('^(?:[0-9]?[0-9])?$')]),
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
    // Set values
    if (this.memberIn != undefined) {
      this.myForm.get('alias').patchValue(this.memberIn.Alias);
      this.myForm.get('externalid').patchValue(this.memberIn.ExternalId);
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
      this.myForm.get('age').patchValue(this.memberIn.Age);
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

        // Resign
      parts = this.memberIn.ResignDate.split(".");
      this.myForm.get('resignday').patchValue(new Date(Date.UTC(Number(parts[2]),Number(parts[1])-1,Number(parts[0]), 0, 0, 0)));
      this.myForm.get('resignreason').patchValue(this.memberIn.ResignReason);

      if (this.memberIn.Active == "ja")
        this.myForm.get('active').patchValue(1);
      else
        this.myForm.get('active').patchValue(0);
      this.myForm.get('memberyears').patchValue(this.memberIn.MemberYears);
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
      this.myForm.get('goldlionbrilliant').patchValue(this.memberIn.GoldLionBrilliant);+
      this.myForm.get('goldlionbrilliantnr').patchValue(this.memberIn.GoldLionBrilliantNumber);
      this.myForm.get('tributmember').patchValue(this.memberIn.TributeMember);
    }
  }

  public getAlias(): void {
    let stringObject: any;
    this.result$ = this.storeService.generateSingleAlias(this.memberIn.Id);
    this.result$.subscribe( v  => {
      stringObject =JSON.stringify(v);
      this.memberIn.Alias = JSON.parse(stringObject).value ;
      this.myForm.get('alias').patchValue(this.memberIn.Alias);
    });
  }

  public calcAge(): void {
    let stringObject: any;
    this.result$ = this.storeService.calcSingleAge(this.memberIn.Birthday);
    this.result$.subscribe( v  => {
      stringObject =JSON.stringify(v);
      this.memberIn.Age= JSON.parse(stringObject).value ;
      this.myForm.get('age').patchValue(this.memberIn.Age);
    });
  }

  public onUpdate(): void {
    this.updateflag =true;
  }

  public onCancel():  void {
    this.updateflag = false;
  }

  public onDelete():  void {
    this.updateflag = false;

    if (this.resignList == "n") {
      let dialogRef = this.dialog.open(MemberResignComponent,
          {width: '450px', data: { member: this.memberIn}});
    }
    else {
      let dialogRef = this.dialog.open(MemberDeleteComponent,
        {width: '450px', data: { member: this.memberIn}});
    }
      //  dialogRef.afterClosed().subscribe( message => {console.log(message,"AFTERCLOSE");
      // this.mem.loadMemberPage()
      // });
  }

  onFormSubmit() {
    this.member.Id = this.memberIn.Id
    this.member.Alias= this.myForm.get('alias').value;
    this.member.ExternalId = this.myForm.get('externalid').value;
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
    this.member.Age = this.myForm.get('age').value;
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

    this.member.MemberYears = this.myForm.get('memberyears').value;
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

    if (this.updateflag) {
      this.result$ = this.storeService.update(this.member)
      this.result$.subscribe(message  => console.log(message));
      this.myForm.reset();
      this.headerService.nextMessage(1);
      this.router.navigate(['../', 'members'], { relativeTo: this.route });
    }
    else {
      this.myForm.reset();
      this.headerService.nextMessage(1);
      this.router.navigate(['../', 'members'], { relativeTo: this.route });
    }
  }
}
