import { Component, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { FieldStoreService } from '../../_general/field/field-store.service';
import { Field } from '../../_general/field/field';
import { ActivityColumnService } from '../activity-column.service';
import { SidebarService } from '../../app-sidebar.service';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'cl-activity-columns',
  templateUrl: './activity-columns.component.html',
  styleUrls: ['./activity-columns.component.scss']
})
export class ActivityColumnsComponent {

  @Output() sidebarEventOff = new EventEmitter();

  public myForm: FormGroup;
  public  fieldList: Field[]=[];

  private resultList: Field[]=[];
  private result$: Observable<string>;

  constructor(
    private router: Router,
    private sf: FieldStoreService,
    private fb: FormBuilder,
    private ac: ActivityColumnService,
    private sb: SidebarService) {

    // Lese  fields
    this.sf.getTableUserFields('activities-mem')
    .subscribe(fields => this.fieldList = fields);
    console.log('fieldList.Length', this.fieldList.length);
    this.sb.nextMessage(true);
    // Erzeuge FormGroup
    this.myForm = fb.group({
        selectedFields: ''
     });
  }

  onFormSubmit() {
    let results: string[];
    results = this.myForm.get('selectedFields').value;
console.log("SUBMIT",results.length);
    if (results.length != 0) {
      this.resultList = [];
      this.result$  = this.sf.resetVisible('activities-mem');
      this.result$.subscribe( message  => console.log(message));
      results.forEach(name => {
        for (let element of this.fieldList) {
          if (element.Column == name) {
            this.resultList.push(element);
            this.result$  = this.sf.updateVisible(element,1);
            this.result$.subscribe( message  => console.log(message));
            break;
          }
        };
      });
      this.ac.nextMessage(this.resultList);
    }
  }

  onClose() {
    // Sidebar schliessen
    this.sb.nextMessage(false);
     // Menüpunkt close aufrufen
    this.router.navigate([{ outlets: {sidebar: ['close']}}]);
  }
}
