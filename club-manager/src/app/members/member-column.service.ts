import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Field } from '../_general/field/field';

@Injectable({
  providedIn: 'root'
})

export class MemberColumnService {

  private resultList = new BehaviorSubject<Field[]>(null);
  sharedMessage = this.resultList.asObservable();

  constructor() { }

  nextMessage( result: Field[]) {
    this.resultList.next(result)
  };
}
