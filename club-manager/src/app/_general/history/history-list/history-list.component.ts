import { Component, OnInit } from '@angular/core';
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

    this.history$ = this.hi.getAll()
    this.history$.subscribe( result => {
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
      console.log('HISTORY_FIELDS',result.length);
      result.forEach(( col: Field, index: number) => {
        this.displayedColumnNames[index] = col.Name;
        this.displayedColumns[index] = col;
      });
    });
  }
}
