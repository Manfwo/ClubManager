import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Group } from './group';

@Injectable({
  providedIn: 'root'
})

export class GroupTransferService {

  private group = new BehaviorSubject<Group>(null);
  sharedGroup = this.group.asObservable();

  constructor() { }

  nextMessage( g: Group) {
    this.group.next(g)
  };
}
