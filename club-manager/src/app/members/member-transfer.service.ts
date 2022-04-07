import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Member } from './member';

@Injectable({
  providedIn: 'root'
})

export class MemberTransferService {

  private member = new BehaviorSubject<Member>(null);
  sharedMember = this.member.asObservable();

  constructor() { }

  nextMessage( m: Member) {
    this.member.next(m)
  };
}
