import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { AppComponent } from './app.component';

@Injectable({
  providedIn: 'root'
})

export class SidebarService {

  private state = new BehaviorSubject<boolean>(false);
  sharedState = this.state.asObservable();

  constructor() { }

  nextMessage( onOff: boolean) {
    console.log("SidebarService", onOff);
    this.state.next(onOff)

  };
}
