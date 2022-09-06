import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Validators } from '@angular/forms';
import { FormGroup, FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { ActivityRaw } from '../activity-raw';
import { ActivityStoreService } from '../activity-store.service';
import { HeaderService } from '../../app-header.service';
@Component({
  selector: 'cl-activity-create',
  templateUrl: './activity-create.component.html',
  styleUrls: ['./activity-create.component.scss']
})
export class ActivityCreateComponent implements OnInit {

  // Fields
  member: ActivityRaw = new ActivityRaw;
  myForm: FormGroup;
  newflag: boolean = false;
  result$: Observable<string>;
  currentYear: number;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private ms: ActivityStoreService,
    private sh:HeaderService
  ) { }

  ngOnInit(): void {

    let currentDate = new Date();
    this.currentYear = currentDate.getFullYear() + 1;

    this.myForm = new FormGroup({

      firstname: new FormControl('',Validators.required),
      familyname: new FormControl('',Validators.required),
      street: new FormControl('',Validators.required),
      zipcode: new FormControl('',[Validators.required,Validators.minLength(5)]),
      city: new FormControl('',Validators.required),
      year: new FormControl('',[Validators.min(1955),Validators.max(this.currentYear),Validators.pattern('^[0-9]*$')]),
      activity: new FormControl(''),
      comment: new FormControl(''),

      });
      // Vorbesetzung
      //this.myForm.get('year').patchValue('76761');
      //this.myForm.get('city').patchValue('Rülzheim');
  }

  public onSave(): void {
    //console.log('SAVE');
    this.newflag = false;
  }

  public onSaveNew():  void {
    //console.log('NEW');
    this.newflag = true;
  }

  onFormSubmit() {

    this.member.Comment = this.myForm.get('comment').value;

    //console.log('CREATE_ACTVITY',this.myForm.value);
    if (this.newflag) {
      this.result$ = this.ms.create(this.member);
      this.result$.subscribe(message  => console.log(message));


    }
    else {
      this.result$ = this.ms.create(this.member)
      this.result$.subscribe(message  => console.log(message));
      this.myForm.reset();
      this.sh.nextMessage(1);
      this.router.navigate(['../', 'activity'], { relativeTo: this.route });
    }
  }
}
