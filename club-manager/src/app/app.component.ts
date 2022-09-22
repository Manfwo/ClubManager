import { Component, OnInit, DoCheck, ViewChild, ViewChildren, QueryList} from '@angular/core';
import { Inject} from '@angular/core';
import { DOCUMENT} from '@angular/common';
import { ThemeSwitchComponent } from './_general/theme-switch/theme-switch.component';
import { LocalStorageService } from './_shared/local-storage.service';
import { TokenStorageService } from './_shared/token-storage.service';
import { SplitComponent, SplitAreaDirective } from 'angular-split';
import { Router } from '@angular/router';
import { CommonValues } from './_shared/common';
import { SidebarService } from './app-sidebar.service';
import { HeaderService } from './app-header.service';
import { FooterService } from './app-footer.service';

@Component({
  selector: 'cl-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent implements OnInit, DoCheck {

  @ViewChild(SplitComponent) splitEl: SplitComponent;
  @ViewChildren(SplitAreaDirective) areasEl: QueryList<SplitAreaDirective>;

  public title = 'Club-Manager';
  public isShowing = true;
  public menuButton = 'minMenuButton';
  public menuSize = 'minMenu';
  public isExpanded = false;
  public isAuthenticated = false;
  public header = 0;
  public footer = 0;
  public sidebarIsVisible = false;
  public statusText = "Bereit";

  constructor(
    private router: Router,
    @Inject(DOCUMENT)
    private document: Document,
    private localStorageService: LocalStorageService,
    private tokenStore: TokenStorageService,
    private headerService: HeaderService,
    private footerService: FooterService,
    private sb: SidebarService) {
    }

  ngOnInit(): void {
    // Theme setzen
    const switchTheme = new ThemeSwitchComponent(this.document, this.localStorageService);
    let theme = this.localStorageService.get('theme');
    if (theme == 'dark') {
      switchTheme.selectDarkTheme();
    }
    else {
      switchTheme.selectLightTheme();
    }
    // Icon oder Icon-Text Menü
    this.setMenu(this.localStorageService.get('menuExpand'));
    // Open/Close Menü
    this.isShowing = this.localStorageService.get('menuShow');
    // Close-Button Sidebar empfangen
    this.sb.sharedState.subscribe(value => {this.sidebarIsVisible= value});
     // Header ändern
    this.headerService.sharedheaderId.subscribe(value => {this.header= value});
    // Footer ändern
    this.footerService.sharedfooterId.subscribe(value => {this.footer= value});
  }

  ngDoCheck(): void {
    if (this.isAuthenticated === false) {
      this.isAuthenticated = CommonValues.isAuthenticated;
      // console.log('AppComponent.DoCheck.isAuthenticated:', this.isAuthenticated);
    }
  }

  // Menü anzeigen
  public onToggleSidenav(): void  {
    this.isShowing = !this.isShowing;
    this.localStorageService.set('menuShow', this.isShowing);
  }

  // Icon oder Icon Text Menü
  public onToggleMenu(): void {
    this.isExpanded = !this.isExpanded;
    this.localStorageService.set('menuExpand', this.isExpanded);
    this.setMenu(this.isExpanded);
    this.isShowing = false;
    setTimeout(() => {
       this.isShowing = true;
    },700);
    //window.location.reload()
  }

  // Logout
  public onLogout(): void  {
    this.tokenStore.signOut();
    this.isAuthenticated  = false;
    CommonValues.isAuthenticated = false;
  }

  onHelp() {
    var win = window.open("http://kgr-database/kgr_club_manual/doku.php?id=start", '_blank');
    win.focus();
  }

  // festlegen der Bereichseinstiegskopfzeile
  onFirstNav(path:string) {
    // Area für Kopfzeile festlegen'
    switch (path) {
     case "dashboard": {
       this.header = 0;
       this.footer = 0;
       break;
      }
      case "members": {
        this.header = 1;
        this.footer = 1;
        break;
      }
      case "groups": {
        this.header = 2;
        this.footer = 2;
        break;
      }
      case "activities": {
        this.header = 3;
        this.footer = 3;
        break;
      }
      case "works": {
        this.header = 4;
        this.footer = 4;
        break;
      }
      case "reports": {
        this.header = 5;
        this.footer = 5;
        break;
      }
      case "statistic": {
        this.header = 6;
        this.footer = 6;
        break;
      }
    }
    this.router.navigate([path]);
  }

  // Sidebar aus-/einblenden
  public hideSidebar($event: boolean) {
    //console.log('SIDEBAR', $event);
    this.sidebarIsVisible = $event;
  }

// ##################
// Private functions
// ##################
  private setMenu( expand: boolean): void {
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
