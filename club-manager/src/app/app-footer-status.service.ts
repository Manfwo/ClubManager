import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class FooterStatusService {

  private status = new BehaviorSubject<string>("");
  sharedstatus = this.status.asObservable();

  private statusText = new BehaviorSubject<string>("");
  sharedstatusText = this.statusText.asObservable();

  constructor() { }

  nextMessage( state: string, sText: string) {
    this.status.next(state)
    this.statusText.next(sText)
  };
}
