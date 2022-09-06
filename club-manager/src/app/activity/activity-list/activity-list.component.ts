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
  @Input() recordValue: number = 0;

  // Tabellen Daten
  displayedColumns: any[] = [];
  displayedColumnNames: string[] = [];
  activity$: Observable<Activity[]>;
  fields$:  Observable<Field[]>;

  constructor(
    private as: ActivityStoreService,
    private sf: FieldStoreService) {}

  ngOnInit(): void {

    this.initTableColumns();

    // Modus alles lesen oder nur zu einem Mitglied
    this.activity$ = this.as.getByMemberId(this.recordValue);
    this.activity$.subscribe( result => {
      if (result != undefined)
      this.loading = false;
    });
  }

  // *** Init Tabellenkopf
  private initTableColumns(): void {
    // sichtbare Spalten lesen
    this.fields$ =  this.sf.getTableVisibleFields('activities');

    // In arrays konvertieren
    this.fields$.subscribe( result => {
      result.forEach(( col: Field, index: number) => {
        this.displayedColumnNames[index] = col.Name;
        this.displayedColumns[index] = col;
      });
    });
  }
}
