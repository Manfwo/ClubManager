import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Member } from './member';

@Injectable({
  providedIn: 'root'
})

export class MemberSelectionService {

  private memberList = new BehaviorSubject<Member[]>(null);
  sharedMemberList = this.memberList.asObservable();

  constructor() { }

  nextMessage( result: Member[]) {
    console.log(result[0].Firstname);
    this.memberList.next(result)
  };
}
