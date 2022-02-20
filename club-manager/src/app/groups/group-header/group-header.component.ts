import { Component, OnInit , Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'cl-group-header',
  templateUrl: './group-header.component.html',
  styleUrls: ['./group-header.component.scss']
})
export class GroupHeaderComponent implements OnInit {

  @Output() hideSidebarEvent = new EventEmitter();

  constructor(private router: Router) { }

  ngOnInit(): void {
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
