import { Component, ViewChild, ViewChildren, QueryList, AfterViewInit, ElementRef } from '@angular/core';
import { SplitComponent, SplitAreaDirective } from 'angular-split';

import { tap } from 'rxjs/operators';
import { fromEvent } from 'rxjs';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';

import { LocalStorageService } from './../../_shared/local-storage.service';

@Component({
  selector: 'cl-member-list',
  templateUrl: './member-list.component.html',
  styleUrls: ['./member-list.component.scss']
})
export class MemberListComponent implements AfterViewInit {

  @ViewChild('input') input: ElementRef;
  @ViewChild(SplitComponent) splitEl: SplitComponent;
  @ViewChildren(SplitAreaDirective) areasEl: QueryList<SplitAreaDirective>;

  // Suchbegriff -> filter für Tabelle
  public search = '';

  constructor( private localStore: LocalStorageService) {
   }

  ngAfterViewInit(): void {
    setTimeout(() => {
      this.search = this.localStore.get('memberFilter');
      this.input.nativeElement.value = this.search;
      // this.areasEl.last.visible = true;
    });

    // Spliter
    // this.areasEl.last.collapse(0, 'left');
    // this.areasEl.first.collapse(101);

    // server-side search
    fromEvent(this.input.nativeElement, 'keyup')
    .pipe(
        debounceTime(150),
        distinctUntilChanged(),
        tap(() => {
           this.search = this.input.nativeElement.value;
           // console.log('FILTERCHANGED', this.search);
           this.localStore.set('memberFilter', this.input.nativeElement.value);
        })
    )
    .subscribe();
  }
}

