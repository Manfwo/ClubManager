import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { FieldStoreService } from '../../_fields/field-store.service';
import { Field } from '../../_fields/field';

@Component({
  selector: 'cl-member-columns',
  templateUrl: './member-columns.component.html',
  styleUrls: ['./member-columns.component.scss']
})
export class MemberColumnsComponent implements OnInit {

  fieldList: Field[];

  constructor(private sf: FieldStoreService, private formBuilder: FormBuilder) {
  }

  techForm = this.formBuilder.group({
    selectedTech: ''
  });

  onFormSubmit() {
    console.log(this.techForm.get('selectedTech').value);
  }

  ngOnInit(): void {
    // read member fields
    this.sf.getTableFields('members')
    .subscribe(fields => this.fieldList = fields);
  }
}

