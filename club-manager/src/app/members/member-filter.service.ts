import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Filter } from '../_general/filter/filter';

@Injectable({
  providedIn: 'root'
})

export class MemberFilterService {

  private filter = new BehaviorSubject<Filter>(null);
  sharedMessage = this.filter.asObservable();

  private filtername = new BehaviorSubject<string>(null);
  sharedMessage1 = this.filtername.asObservable();

  constructor() { }

  nextMessage( result: Filter) {
    this.filter.next(result)
  };

  nextMessage1( result: string) {
    this.filtername.next(result)
  };
}
