import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Validators } from '@angular/forms';
import { FormBuilder, FormArray, FormGroup, FormControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Member } from '../member';


@Component({
  selector: 'cl-member-details',
  templateUrl: './member-details.component.html',
  styleUrls: ['./member-details.component.scss']
})
export class MemberDetailsComponent implements OnInit {

  // Fields
  member: Member = new Member;
  myForm: FormGroup;

  @Output() submitMember = new EventEmitter<Member>();

  constructor(
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {

    this.myForm = new FormGroup({
      //
        gender: new FormControl(''),
        title: new FormControl(''),
        firstname: new FormControl(''),
        familyname: new FormControl(''),
        street: new FormControl(''),
        zipcode: new FormControl('',Validators.min(5)),
        city: new FormControl(''),
        //email: new FormControl('',Validators.email)

        bronze: new FormControl(''),
        silver: new FormControl(''),
        gold: new FormControl('')
      });

/*
    const params = this.route.snapshot.paramMap;
    console.log('Param: ', params.get('id'));
    this.mb.getSingle(parseInt(params.get('id'), 10))
      .subscribe(m => this.member = m); */
  }

  onFormSubmit() {
    console.log(this.myForm.value);
    console.log( this.myForm.get('gender').value);
    this.member.Gender = this.myForm.get('gender').value;
    this.member.Title = this.myForm.get('title').value;
    this.member.Firstname = this.myForm.get('firstname').value;
    this.member.Familyname = this.myForm.get('familyname').value;
    this.member.Street = this.myForm.get('street').value;
    this.member.Zipcode = this.myForm.get('zipcode').value;
    this.member.City = this.myForm.get('city').value;
    this.submitMember.emit(this.member);
  }

  /*
  removeMember(): void {
    if (confirm('Mitglied wirklich löschen?')) {
      this.mb.remove(this.member.Id)
        .subscribe(res => this.router.navigate(['../'], { relativeTo: this.route }));
    }
  }
  */
}
