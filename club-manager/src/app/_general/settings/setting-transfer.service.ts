import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class SettingTransferService {

  private memberStoarge = new BehaviorSubject('');
  sharedMessage = this.memberStoarge.asObservable();

  constructor() { }

  nextMessage(message: string) {
    this.memberStoarge.next(message)
  };
}
