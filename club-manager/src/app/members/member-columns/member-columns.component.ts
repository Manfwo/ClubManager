import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { FieldStoreService } from '../../_fields/field-store.service';
import { Field } from '../../_fields/field';

@Component({
  selector: 'cl-member-columns',
  templateUrl: './member-columns.component.html',
  styleUrls: ['./member-columns.component.scss']
})
export class MemberColumnsComponent {

  fieldList: Field[]=[];
  myForm: FormGroup;

  constructor(private sf: FieldStoreService, private fb: FormBuilder) {

    // read member fields
    this.sf.getTableFields('members')
    .subscribe(fields => this.fieldList = fields);
    console.log('fieldList.Length', this.fieldList.length);


    this.myForm = fb.group({
        selectedFields: ''
     });
  }

  onFormSubmit() {
    console.log('ReturnValues', this.myForm.get('selectedFields').value);
  }
}

