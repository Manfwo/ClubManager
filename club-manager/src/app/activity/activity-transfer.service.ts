import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Activity } from './activity';

@Injectable({
  providedIn: 'root'
})

export class ActivityTransferService {

  private activity = new BehaviorSubject<Activity>(null);
  sharedActivity = this.activity.asObservable();

  constructor() { }

  nextMessage( m: Activity) {
    this.activity.next(m)
  };
}
