import { Component, OnInit, Output, EventEmitter, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import { Router } from '@angular/router';
import { fromEvent } from 'rxjs';
import { tap } from 'rxjs/operators';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { HeaderService } from 'src/app/app-header.service';
import { SidebarService } from 'src/app/app-sidebar.service';
import { LocalStorageService } from 'src/app/_shared/local-storage.service';
import { ActivitySearchService } from '../activity-search.service';

@Component({
  selector: 'cl-activity-header',
  templateUrl: './activity-header.component.html',
  styleUrls: ['./activity-header.component.scss']
})

export class ActivityHeaderComponent implements AfterViewInit {

  @ViewChild('input1') input1: ElementRef;
  @ViewChild('input2') input2: ElementRef;
  @Output() hideSidebarEvent = new EventEmitter<boolean>();
  @Output() searchEvent = new EventEmitter<string>();

  // Suchbegriff -> filter für Tabelle
  public search1 = '';
  public search2 = '';

  constructor(
    private localStore: LocalStorageService,
    private router: Router,
    private headerService: HeaderService,
    private sidebarService: SidebarService,
    private serchService: ActivitySearchService) {
   }

  ngAfterViewInit(): void {
    // Setzt letzte Suche
    setTimeout(() => {
      this.search1 = this.localStore.get('activityFilter');
      this.input1.nativeElement.value = this.search1;
      this.search2 = this.localStore.get('activityFilterYear');
      this.input2.nativeElement.value = this.search2;
    });

    // server-side search
    fromEvent(this.input1.nativeElement, 'keyup')
    .pipe(
        debounceTime(150),
        distinctUntilChanged(),
        tap(() => {
           this.search1 = this.input1.nativeElement.value;
           this.localStore.set('activityFilter', this.search1);
           this.search2 = this.input2.nativeElement.value;
           this.localStore.set('activityFilterYear', this.search2);
           this.serchService.nextMessage(this.search1 + "/" + this.search2);
        })
    )
    .subscribe();

    // server-side search
    fromEvent(this.input2.nativeElement, 'keyup')
    .pipe(
        debounceTime(150),
        distinctUntilChanged(),
        tap(() => {
            this.search1 = this.input1.nativeElement.value;
            this.localStore.set('activityFilter', this.search1);
            this.search2 = this.input2.nativeElement.value;
            this.localStore.set('activityFilterYear', this.search2);
            this.serchService.nextMessage(this.search1 + "/" + this.search2);
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

  onHelp() {
    var win = window.open("http://kgr-database/kgr_club_manual/doku.php?id=manual:aktivitaeten_1", '_blank');
    win.focus();
  }

  // Add Activity Button
  headerNav(path:string) {
    this.headerService.nextMessage(11);
    this.sidebarService.nextMessage(false);
    this.router.navigate( [path]);
  }
}
