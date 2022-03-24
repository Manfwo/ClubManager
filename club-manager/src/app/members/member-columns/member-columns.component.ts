import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { FieldStoreService } from '../../_fields/field-store.service';
import { Field } from '../../_fields/field';
import { MemberColumnService } from './../member-column.service';

@Component({
  selector: 'cl-member-columns',
  templateUrl: './member-columns.component.html',
  styleUrls: ['./member-columns.component.scss']
})
export class MemberColumnsComponent {

  fieldList: Field[]=[];
  resultList: Field[]=[];
  myForm: FormGroup;

  constructor(private sf: FieldStoreService, private fb: FormBuilder, private mc: MemberColumnService) {

    // Lese member fields
    this.sf.getTableFields('members')
    .subscribe(fields => this.fieldList = fields);
    //console.log('fieldList.Length', this.fieldList.length);

    // Erzeuge FormGroup
    this.myForm = fb.group({
        selectedFields: ''
     });
  }

  onFormSubmit() {
    let results: string[];
    results = this.myForm.get('selectedFields').value;

    if (results.length != 0) {
      //console.log("CHANGES");
      this.resultList = [];
      this.sf.resetVisible('members');
      results.forEach(name => {
        for (let element of this.fieldList) {
          if (element.Column == name) {
            //console.log("FOUND:",name);
            this.resultList.push(element);
            this.sf.updateVisible(element.Id,1);
            break;
          }
        };
      });
      this.mc.nextMessage(this.resultList);
    }
    //console.log("resultList.length:",this.resultList.length);
  }
}
