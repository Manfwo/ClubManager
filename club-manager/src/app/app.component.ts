import { CommonValues } from './_shared/common';
import { Component, OnInit, DoCheck } from '@angular/core';
import { Inject} from '@angular/core';
import { DOCUMENT} from '@angular/common';
import { ThemeSwitchComponent } from './general/theme-switch/theme-switch.component';
import { LocalStorageService } from './_shared/local-storage.service';
import { TokenStorageService } from './_shared/token-storage.service';

@Component({
  selector: 'cl-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent implements OnInit, DoCheck {

  constructor(
    @Inject(DOCUMENT)
    private document: Document,
    private localStorageService: LocalStorageService,
    private tokenStore: TokenStorageService ) {
  }
  public title = 'Club-Manager';
  public isShowing = true;
  public menuButton = 'minMenuButton';
  public menuSize = 'minMenu';
  public isExpanded = false;
  public isAuthenticated = false;

  ngOnInit(): void {
    // Theme setzen
    const switchTheme = new ThemeSwitchComponent(this.document, this.localStorageService);
    if (this.localStorageService.get('theme') === 'light') {
      switchTheme.selectLightTheme();
    }
    else {
      switchTheme.selectDarkTheme();
    }
    // Icon oder Icon-Text Menü
    this.setMenu(this.localStorageService.get('expandMenu'));
    // Open/Close Menü
    this.isShowing = this.localStorageService.get('showMenu');
  }

  ngDoCheck(): void {
    if (this.isAuthenticated === false) {
      this.isAuthenticated = CommonValues.isAuthenticated;
      console.log('DoCheck - Authentication:', this.isAuthenticated);
    }
  }

  // Logout
  public logout(): void  {
    this.tokenStore.signOut();
    this.isAuthenticated  = false;
    CommonValues.isAuthenticated = false;
  }

  // Menü anzeigen
  public toggleSidenav(): void  {
    this.isShowing = !this.isShowing;
    this.localStorageService.set('showMenu', this.isShowing);
  }

  // Icon oder Icon Text Menü
  public toggleMenu(): void {
    this.isShowing = false;
    this.isExpanded = !this.isExpanded;
    this.localStorageService.set('expandMenu', this.isExpanded);
    this.setMenu(this.isExpanded);
    this.isShowing = true;
  }

  setMenu( expand: boolean): void {
    this.isExpanded = expand;
    if (expand) {
      this.menuSize = 'maxMenu';
      this.menuButton = 'maxMenuButton';
    }
    else {
      this.menuSize = 'minMenu';
      this.menuButton = 'minMenuButton';
    }
  }
}
