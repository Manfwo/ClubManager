import { Component, Output, EventEmitter, OnInit } from '@angular/core';
import { SidebarService } from './../../app-sidebar.service';
import { Router } from '@angular/router';
import { Filter } from 'src/app/_general/filter/filter';
import { FilterStoreService } from 'src/app/_general/filter/filter-store.service';
import { MemberFilterService } from '../member-filter.service';
import { LocalStorageService } from 'src/app/_shared/local-storage.service';

@Component({
  selector: 'cl-member-filter',
  templateUrl: './member-filter.component.html',
  styleUrls: ['./member-filter.component.scss']
})
export class MemberFilterComponent implements OnInit {

  @Output() sidebarEventOff = new EventEmitter();

  public filterList: Filter[]=[];
  public selectedFilterId: number;

  constructor(
    private localStore: LocalStorageService,
    private router: Router,
    private storeService: FilterStoreService,
    private sb: SidebarService,
    private mf: MemberFilterService) {}

  ngOnInit(): void {
    // Settings für selektierten Filter holen
    this.selectedFilterId = this.localStore.get('memberFilterId');

    // Lese filterliste
    this.storeService.getFilters('members')
    .subscribe(f => this.filterList = f);
    this.sb.nextMessage(true);
  }

  onResetFilter() {
    this.selectedFilterId = 0
    this.localStore.set('memberFilterId', this.selectedFilterId);
    let filter = new Filter();
    this.mf.nextMessage(filter);
  }

  onSelectFilter(filter: Filter) {
    this.selectedFilterId = filter.Id
    this.localStore.set('memberFilterId', this.selectedFilterId);
    this.mf.nextMessage(filter);
  }

  onClose() {
    // Sidebar schliessen
    this.sb.nextMessage(false);
     // Menüpunkt close aufrufen
    this.router.navigate([{ outlets: {sidebar: ['close']}}]);
  }
}
