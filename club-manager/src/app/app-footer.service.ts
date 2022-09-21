import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class FooterService {

  private footerId = new BehaviorSubject<number>(0);
  sharedfooterId = this.footerId.asObservable();

  constructor() { }

  nextMessage( fId: number) {
    //console.log("footerid", fId);
    this.footerId.next(fId)
  };
}
