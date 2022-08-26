import { Component, OnInit, Input } from '@angular/core';
import { Observable } from 'rxjs';
import { ActivityStoreService } from '../activity-store.service';
import { FieldStoreService } from '../../_general/field/field-store.service';
import { Field } from '../../_general/field/field';
import { Activity } from '../activity';

@Component({
  selector: 'cl-activity-list',
  templateUrl: './activity-list.component.html',
  styleUrls: ['./activity-list.component.scss']
})
export class ActivityListComponent implements OnInit {

  loading = true;           // Kennungn für Spinner

  @Input() modeSwitch: number = 0;
  @Input() recordValue: number = 0;

  // Tabellen Daten
  displayedColumns: any[] = [];
  displayedColumnNames: string[] = [];
  activity$: Observable<Activity[]>;
  fields$:  Observable<Field[]>;

  constructor(
    private hi: ActivityStoreService,
    private sf: FieldStoreService) {}

  ngOnInit(): void {

    this.initTableColumns();

    // Modus alles lesen oder nur zu einem Mitglied
    if (this.modeSwitch == 0)
     // this.activity$ = this.hi.getAll()
    //else
      //this.activity$ = this.hi.getByRecordId(this.recordValue)

    this.activity$.subscribe( result => {
      if (result != undefined)
        console.log('HISTORY_RESULT',result.length);
      this.loading = false;
    });
  }

  // *** Init Tabellenkopf
  private initTableColumns(): void {
    // sichtbare Spalten lesen
    this.fields$ =  this.sf.getTableVisibleFields('history');

    // In arrays konvertieren
    this.fields$.subscribe( result => {
      //console.log('HISTORY_FIELDS',result.length);
      result.forEach(( col: Field, index: number) => {
        this.displayedColumnNames[index] = col.Name;
        this.displayedColumns[index] = col;
      });
    });
  }
}
