import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { PageParameter } from './page-parameter';

@Injectable({
  providedIn: 'root'
})

export class PageParameterService {

  private param = new BehaviorSubject<PageParameter>(new PageParameter());

  public sharedPageParameter = this.param.asObservable();

  constructor() { }

  public nextMessage( p: PageParameter) {
    //console.log("PAGE-SERVICE",p);
    this.param.next(p)
  };
}
