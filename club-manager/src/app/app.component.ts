import { Component } from '@angular/core';

@Component({
  selector: 'cl-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'Club-Manager';
  isAuthenticated = true;
  menuSize = 'minMenu';

  public isExpanded = false;

  public toggleMenu(): void {
    this.isExpanded = !this.isExpanded;
    if (this.isExpanded) {
      this.menuSize = 'maxMenu';
    }
    else {
      this.menuSize = 'minMenu';
    }
  }
}
