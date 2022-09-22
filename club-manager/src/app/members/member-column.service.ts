import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Field } from '../_general/field/field';

@Injectable({
  providedIn: 'root'
})

export class MemberColumnService {

  private resultList = new BehaviorSubject<Field[]>(null);
  sharedMessage = this.resultList.asObservable();

  private resultListGroup = new BehaviorSubject<Field[]>(null);
  sharedMessageGroup = this.resultListGroup.asObservable();

  constructor() { }

  nextMessage( result: Field[]) {
    this.resultList.next(result)
  };

  nextMessageGroup( result: Field[]) {
    this.resultListGroup.next(result)
  };
}
