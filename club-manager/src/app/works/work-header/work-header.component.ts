import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'cl-work-header',
  templateUrl: './work-header.component.html',
  styleUrls: ['./work-header.component.scss']
})
export class WorkHeaderComponent implements OnInit {

  @Output() hideSidebarEvent = new EventEmitter();

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  onHelp() {
    var win = window.open("http://kgr-database/kgr_club_manual/doku.php?id=manual:arbeitsplan_1", '_blank');
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
}
