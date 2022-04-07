import { AfterViewInit, Component,  ElementRef, ViewChild, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { tap } from 'rxjs/operators';
import { fromEvent } from 'rxjs';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { LocalStorageService } from '../../_shared/local-storage.service';
import { MemberSearchService } from './../member-search.service';
import { HeaderService } from './../../app-header.service';
import { SidebarService } from 'src/app/app-sidebar.service';

@Component({
  selector: 'cl-member-header',
  templateUrl: './member-header.component.html',
  styleUrls: ['./member-header.component.scss']
})
export class MemberHeaderComponent implements AfterViewInit {

  @ViewChild('input') input: ElementRef;
  @Output() hideSidebarEvent = new EventEmitter<boolean>();
  @Output() searchEvent = new EventEmitter<string>();

  // Suchbegriff -> filter für Tabelle
  public search = '';

  constructor(
    private localStore: LocalStorageService,
    private router: Router,
    private hs: HeaderService,
    private sb: SidebarService,
    private ms: MemberSearchService) {
   }

  ngAfterViewInit(): void {
    setTimeout(() => {
      this.search = this.localStore.get('memberFilter');
      this.input.nativeElement.value = this.search;
    });

    // server-side search
    fromEvent(this.input.nativeElement, 'keyup')
    .pipe(
        debounceTime(150),
        distinctUntilChanged(),
        tap(() => {
           this.search = this.input.nativeElement.value;
           this.localStore.set('memberFilter', this.search);
           this.ms.nextMessage(this.search);
        })
    )
    .subscribe();
  }

  // 3 Punkte Menü rechts
  secondaryNav(path:string) {
    // Sidebar aktivieren
    if (path == "close")
      this.hideSidebarEvent.emit(false);
    else {
      this.hideSidebarEvent.emit(true);
    }
      // Menüpunkt verarbeiten
      this.router.navigate([{ outlets: {
        sidebar: [path]
      }}]);

  }

  // Add Member Button
  headerNav(path:string) {
    this.hs.nextMessage(11);
    this.sb.nextMessage(false);
    this.router.navigate( [path]);
  }
}
