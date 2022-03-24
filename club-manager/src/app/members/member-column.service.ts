import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Field } from '../_fields/field';

@Injectable({
  providedIn: 'root'
})

export class MemberColumnService {

  private resultList = new BehaviorSubject<Field[]>(null);
  sharedMessage = this.resultList.asObservable();

  constructor() { }

  nextMessage( result: Field[]) {
    //console.log("MemberColumnService",result[0].Label);
    this.resultList.next(result)
  };
}
