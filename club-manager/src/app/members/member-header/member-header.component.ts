import { AfterViewInit, Component,  ElementRef, ViewChild, Output, EventEmitter, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { tap } from 'rxjs/operators';
import { fromEvent } from 'rxjs';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { LocalStorageService } from '../../_shared/local-storage.service';
import { MemberSearchService } from './../member-search.service';
import { HeaderService } from './../../app-header.service';
import { SidebarService } from 'src/app/app-sidebar.service';
import { MemberFilterService } from '../member-filter.service';
import { Filter } from 'src/app/_general/filter/filter';

@Component({
  selector: 'cl-member-header',
  templateUrl: './member-header.component.html',
  styleUrls: ['./member-header.component.scss']
})
export class MemberHeaderComponent implements OnInit, AfterViewInit {

  @ViewChild('input') input: ElementRef;
  @Output() hideSidebarEvent = new EventEmitter<boolean>();
  @Output() searchEvent = new EventEmitter<string>();

  // Suchbegriff -> filter für Tabelle
  public search = '';
  public title = "Mitglieder";
  public memberList = true;
  public filter: Filter;
  public filterName = "";

  constructor(
    private localStore: LocalStorageService,
    private router: Router,
    private hs: HeaderService,
    private sb: SidebarService,
    private ms: MemberSearchService,
    private filterService: MemberFilterService){
   }

  ngOnInit(): void {
    this.filterService.sharedMessage1.subscribe(f => {this.filterName = f;
      if (this.filterName == undefined)
          this.filterName = "";
      //console.log("FILTERHEADER",this.filterName)
    });
  }

  ngAfterViewInit(): void {
    // Settings für ehemalige Mitglieder lesen
    if (this.localStore.get('member_resign') == 'y') {
        this.title = "Mitglieder Ablage";
        this.memberList = false;
    }

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

  onHelp() {
    var win = window.open("http://kgr-database/kgr_club_manual/doku.php?id=manual:mitglieder_1", '_blank');
    win.focus();
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
