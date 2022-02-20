import { AfterViewInit, Component,  ElementRef, ViewChild, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { tap } from 'rxjs/operators';
import { fromEvent } from 'rxjs';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { LocalStorageService } from '../../_shared/local-storage.service';


@Component({
  selector: 'cl-member-header',
  templateUrl: './member-header.component.html',
  styleUrls: ['./member-header.component.scss']
})
export class MemberHeaderComponent implements AfterViewInit {

  @ViewChild('input') input: ElementRef;
  @Output() hideSidebarEvent = new EventEmitter();

  // Suchbegriff -> filter für Tabelle
  public search = '';

  constructor( private localStore: LocalStorageService, private router: Router) {
   }

  ngAfterViewInit(): void {
    setTimeout(() => {
      this.search = this.localStore.get('memberFilter');
      this.input.nativeElement.value = this.search;
      // this.areasEl.last.visible = true;
    });

    // server-side search
    fromEvent(this.input.nativeElement, 'keyup')
    .pipe(
        debounceTime(150),
        distinctUntilChanged(),
        tap(() => {
           this.search = this.input.nativeElement.value;
           // console.log('FILTERCHANGED', this.search);
           this.localStore.set('memberFilter', this.input.nativeElement.value);
        })
    )
    .subscribe();
  }

  // 3 Punkte Menü rechts
  secondaryNav(path:string) {
    // Sidebar aktivieren
    if (path == "close")
      this.hideSidebarEvent.emit(false);
    else
      this.hideSidebarEvent.emit(true);

    // Menüpunkt verarbeiten
    this.router.navigate([{ outlets: {
      sidebar: [path]
    }}]);
  }

}
