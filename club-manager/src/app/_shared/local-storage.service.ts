'use strict';
import { CDK_CONNECTED_OVERLAY_SCROLL_STRATEGY } from '@angular/cdk/overlay/overlay-directives';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {
  localStorage: Storage;

  changes$ = new Subject();

  constructor() {
    this.localStorage   = window.localStorage;
  }

  get(key: string): any {
    if (this.isLocalStorageSupported) {
      let value: any = localStorage.getItem(key);
      console.log("LOCALSTORE",value);
      if (value != undefined) {
        console.log("LOCALSTORE!");
        return JSON.parse(value);
      }
    }
    return "";
  }

  set(key: string, value: any): boolean {
    if (this.isLocalStorageSupported) {
      this.localStorage.setItem(key, JSON.stringify(value));
      this.changes$.next({
        type: 'set',
        key,
        value
      });
      return true;
    }

    return false;
  }

  remove(key: string): boolean {
    if (this.isLocalStorageSupported) {
      this.localStorage.removeItem(key);
      this.changes$.next({
        type: 'remove',
        key
      });
      return true;
    }

    return false;
  }

  get isLocalStorageSupported(): boolean {
    return !!this.localStorage;
  }
}
