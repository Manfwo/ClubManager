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
    //console.log("SETTINGS.TRANSFER.SERVICE",message);
    this.memberStoarge.next(message)
  };
}
