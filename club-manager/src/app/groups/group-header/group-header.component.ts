import { Component, OnInit , Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { HeaderService } from 'src/app/app-header.service';
import { SidebarService } from 'src/app/app-sidebar.service';

@Component({
  selector: 'cl-group-header',
  templateUrl: './group-header.component.html',
  styleUrls: ['./group-header.component.scss']
})
export class GroupHeaderComponent implements OnInit {

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

    // Add Group Button
    headerNav(path:string) {
      this.hs.nextMessage(15);
      this.sb.nextMessage(false);
      this.router.navigate( [path]);
    }
}
