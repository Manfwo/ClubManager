import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { PageParameter } from './page-parameter';

@Injectable({
  providedIn: 'root'
})

export class PageParameterService {

  private param = new BehaviorSubject<PageParameter>(new PageParameter());
  public sharedPageParameter = this.param.asObservable();

  private length = new BehaviorSubject<number>(0);
  public sharedLength = this.length.asObservable();

  constructor() { }

  public nextMessage( p: PageParameter) {
    this.param.next(p)
  };

  public nextLength( l: number) {
    this.length.next(l)
  };
}
