import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class MemberSearchService {

  private searchText = new BehaviorSubject('');
  sharedMessage = this.searchText.asObservable();

  constructor() { }

  nextMessage(message: string) {
    this.searchText.next(message)
  };
}
