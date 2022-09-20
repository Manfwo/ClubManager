import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { HeaderService } from 'src/app/app-header.service';
import { SidebarService } from 'src/app/app-sidebar.service';

@Component({
  selector: 'cl-group-update-header',
  templateUrl: './group-update-header.component.html',
  styleUrls: ['./group-update-header.component.scss']
})
export class GroupUpdateHeaderComponent implements OnInit {

  @Output() hideSidebarEvent = new EventEmitter();

  constructor(
    private router: Router,
    private hs: HeaderService,
    private sb: SidebarService,
  ) { }

  ngOnInit(): void {
  }

  onHelp() {
    var win = window.open("http://kgr-database/kgr_club_manual/doku.php?id=manual:gruppen_1", '_blank');
    win.focus();
  }

  // 3 Punkte Menü rechts
  onSecondaryNav(path:string) {
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
}
