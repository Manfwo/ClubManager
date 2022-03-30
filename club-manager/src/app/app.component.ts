import { Observable } from 'rxjs';
import { Component, OnInit, DoCheck, ViewChild, ViewChildren, QueryList} from '@angular/core';
import { Inject} from '@angular/core';
import { DOCUMENT} from '@angular/common';
import { ThemeSwitchComponent } from './general/theme-switch/theme-switch.component';
import { LocalStorageService } from './_shared/local-storage.service';
import { TokenStorageService } from './_shared/token-storage.service';
import { SplitComponent, SplitAreaDirective } from 'angular-split';
import { Router } from '@angular/router';
import { CommonValues } from './_shared/common';
import { SidebarService } from './app-sidebar.service';

@Component({
  selector: 'cl-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent implements OnInit, DoCheck {

  @ViewChild(SplitComponent) splitEl: SplitComponent;
  @ViewChildren(SplitAreaDirective) areasEl: QueryList<SplitAreaDirective>;

  constructor(

    private router: Router,
    @Inject(DOCUMENT)
    private document: Document,
    private localStorageService: LocalStorageService,
    private tokenStore: TokenStorageService,
    private sb: SidebarService) {
    }

  public title = 'Club-Manager';
  public isShowing = true;
  public menuButton = 'minMenuButton';
  public menuSize = 'minMenu';
  public isExpanded = false;
  public isAuthenticated = false;
  public area = 0;
  public sidebarIsVisible = false;
  public statusText = "Ready";


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
    this.setMenu(this.localStorageService.get('menuExpand'));
    // Open/Close Menü
    this.isShowing = this.localStorageService.get('menuShow');
    // Close-Button Sidebar empfangen
    this.sb.sharedState.subscribe(value => {console.log('NEXT',value); this.sidebarIsVisible= value});
  }

  ngDoCheck(): void {
    if (this.isAuthenticated === false) {
      this.isAuthenticated = CommonValues.isAuthenticated;
      // console.log('AppComponent.DoCheck.isAuthenticated:', this.isAuthenticated);
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
    this.localStorageService.set('menuShow', this.isShowing);
  }

  // Icon oder Icon Text Menü
  public toggleMenu(): void {
    this.isShowing = false;
    this.isExpanded = !this.isExpanded;
    this.localStorageService.set('menuExpand', this.isExpanded);
    this.setMenu(this.isExpanded);
    this.isShowing = true;
    window.location.reload()
  }

  // Sidebar aus-/einblenden
  public hideSidebar($event: boolean) {
    console.log('SIDEBAR', $event);
    this.sidebarIsVisible = $event;
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

  firstNav(path:string) {

    // Area für Kopfzeile festlegen'
    switch (path) {
     case "dashboard": {
       this.area = 0;
       break;
      }
      case "members": {
        this.area = 1;
        break;
      }
      case "groups": {
        this.area = 2;
        break;
      }
      case "activities": {
        this.area = 3;
        break;
      }
      case "works": {
        this.area = 4;
        break;
      }
      case "reports": {
        this.area = 5;
        break;
      }
      case "statistic": {
        this.area = 6;
        break;
      }
    }
    this.router.navigate([path]);
  }
}
