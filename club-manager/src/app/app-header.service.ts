import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class HeaderService {

  private headerId = new BehaviorSubject<number>(-1);
  sharedheaderId = this.headerId.asObservable();

  constructor() { }

  nextMessage( areaId: number) {
    console.log("Headerid", areaId);
    this.headerId.next(areaId)
  };
}
