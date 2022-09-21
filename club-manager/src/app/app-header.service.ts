import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class HeaderService {

  private headerId = new BehaviorSubject<number>(0);
  sharedheaderId = this.headerId.asObservable();

  constructor() { }

  nextMessage( hId: number) {
    //console.log("Headerid", hId);
    this.headerId.next(hId)
  };
}
