import { Component } from '@angular/core';
@Component({
  selector: 'cl-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent {
  public title = 'Club-Manager';
  public isAuthenticated = true;
  public isExpanded = false;
  public menuSize = 'minMenu';
  public menuButton = 'minMenuButton';

  // Text oder Menü
  public toggleMenu(): void {
    this.isExpanded = !this.isExpanded;
    if (this.isExpanded) {
      this.menuSize = 'maxMenu';
      this.menuButton = 'maxMenuButton';
    }
    else {
      this.menuSize = 'minMenu';
      this.menuButton = 'minMenuButton';
    }
  }
}
