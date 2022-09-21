import { Component, OnInit , Output, EventEmitter, ElementRef, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { fromEvent } from 'rxjs';
import { debounceTime, distinctUntilChanged, tap } from 'rxjs/operators';
import { HeaderService } from 'src/app/app-header.service';
import { SidebarService } from 'src/app/app-sidebar.service';
import { LocalStorageService } from 'src/app/_shared/local-storage.service';
import { GroupSearchService } from '../group-search.service';

@Component({
  selector: 'cl-group-header',
  templateUrl: './group-header.component.html',
  styleUrls: ['./group-header.component.scss']
})
export class GroupHeaderComponent implements OnInit {

  @ViewChild('input') input: ElementRef;
  @Output() hideSidebarEvent = new EventEmitter<boolean>();
  @Output() searchEvent = new EventEmitter<string>();

  // Suchbegriff -> filter für Tabelle
  public search = '';

  constructor(
    private localStore: LocalStorageService,
    private router: Router,
    private searchService: GroupSearchService,
    private hs: HeaderService,
    private sb: SidebarService,
    ) { }

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
    setTimeout(() => {
      this.search = this.localStore.get('groupSearch');
      this.input.nativeElement.value = this.search;
    });

    // server-side search
    fromEvent(this.input.nativeElement, 'keyup')
    .pipe(
        debounceTime(150),
        distinctUntilChanged(),
        tap(() => {
           this.search = this.input.nativeElement.value;
           this.localStore.set('groupSearch', this.search);
           this.searchService.nextMessage(this.search);
        })
    )
    .subscribe();
  }

  onHelp() {
    var win = window.open("http://kgr-database/kgr_club_manual/doku.php?id=manual:gruppen_1", '_blank');
    win.focus();
  }

  // Add Group Button
  onCreate(path:string) {
    this.hs.nextMessage(15);
    this.sb.nextMessage(false);
    this.router.navigate( [path]);
  }
}
