import { Component, OnInit, Input } from '@angular/core';
import { Observable } from 'rxjs';
import { HistoryStoreService } from '../history-store.service';
import { FieldStoreService } from '../../field/field-store.service';
import { Field } from '../../field/field';
import { History } from '../history';

@Component({
  selector: 'cl-history-list',
  templateUrl: './history-list.component.html',
  styleUrls: ['./history-list.component.scss']
})
export class HistoryListComponent implements OnInit {

  loading = true;           // Kennungn für Spinner

  @Input() modeSwitch: number = 0;
  @Input() recordValue: number = 0;

  // Tabellen Daten
  displayedColumns: any[] = [];
  displayedColumnNames: string[] = [];
  history$: Observable<History[]>;
  fields$:  Observable<Field[]>;

  constructor(
    private hi: HistoryStoreService,
    private sf: FieldStoreService) {}

  ngOnInit(): void {
    this.initTableColumns();
  }

  // Init Tabellenkopf
  private initTableColumns(): void {
    // sichtbare Spalten lesen
    this.fields$ =  this.sf.getTableVisibleFields('history');
    this.fields$.subscribe( result => {
      //console.log('HISTORY_HEADER',result.length);
      result.forEach(( col: Field, index: number) => {
        //console.log('Spaltenkopf:',col.Name);
        this.displayedColumnNames[index] = col.Name;
        this.displayedColumns[index] = col;
      });
      this.readHistory();
    });
  }

  // History lesen
  private readHistory(): void {
    // Modus alles lesen oder nur zu einem Mitglied
    if (this.modeSwitch == 0)
      this.history$ = this.hi.getAll()
    else
      this.history$ = this.hi.getByRecordId(this.recordValue)

    this.history$.subscribe( result => {
      if (result != undefined)
          this.loading = false;
       console.log('HISTORY_RESULT',result.length);
    });
  }
}
