import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Validators } from '@angular/forms';
import { FormGroup, FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { GroupRaw } from '../group-raw';
import { GroupStoreService } from '../group-store.service';
import { HeaderService } from './../../app-header.service';

@Component({
  selector: 'cl-group-create',
  templateUrl: './group-create.component.html',
  styleUrls: ['./group-create.component.scss']
})
export class GroupCreateComponent implements OnInit {

  // Fields
  group: GroupRaw = new GroupRaw;
  myForm: FormGroup;
  newflag: boolean = false;
  result$: Observable<string>;
  currentYear: number;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private ms: GroupStoreService,
    private sh:HeaderService
  ) { }

  ngOnInit(): void {

    this.myForm = new FormGroup({
        name: new FormControl('',Validators.required),
        comment: new FormControl(''),
      });
  }

  public onSave(): void {
    this.newflag = false;
  }

  public onSaveNew():  void {
    this.newflag = true;
  }

  onFormSubmit() {
    this.group.Name = this.myForm.get('name').value;
    this.group.Comment = this.myForm.get('comment').value;

    if (this.newflag) {
      this.result$ = this.ms.create(this.group);
      this.result$.subscribe(message  => console.log(message));

      // clear input fields
      this.myForm.reset();
      this.myForm.controls['name'].setErrors(null);
      this.myForm.controls['comment'].setErrors(null);
    }
    else {
      this.result$ = this.ms.create(this.group)
      this.result$.subscribe(message  => console.log(message));
      this.myForm.reset();
      this.sh.nextMessage(3);
      this.router.navigate(['../', 'groups'], { relativeTo: this.route });
    }
  }
}
