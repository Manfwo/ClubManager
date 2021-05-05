import { Component, Inject } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { LocalStorageService } from '../../_shared/local-storage.service';

@Component({
  selector: 'cl-theme-switch',
  templateUrl: './theme-switch.component.html',
  styleUrls: ['./theme-switch.component.scss']
})
export class ThemeSwitchComponent {

    private static readonly DARK_THEME_CLASS = 'dark-theme';
    private static readonly LIGHT_THEME_CLASS = 'light-theme';
    private static readonly THEME_LIGHT = 'light';
    private static readonly THEME_DARK = 'dark';

    public theme: string;

    constructor(@Inject(DOCUMENT) private document: Document, private localStorageService: LocalStorageService) {
      this.theme = this.document.documentElement.classList.contains(ThemeSwitchComponent.DARK_THEME_CLASS) ?
                   ThemeSwitchComponent.THEME_DARK : ThemeSwitchComponent.THEME_LIGHT;
    }

    public selectDarkTheme(): void {
        this.document.documentElement.classList.replace(ThemeSwitchComponent.LIGHT_THEME_CLASS, ThemeSwitchComponent.DARK_THEME_CLASS);
        this.theme = ThemeSwitchComponent.THEME_DARK;
        this.localStorageService.set('theme', ThemeSwitchComponent.THEME_DARK);
    }

    public selectLightTheme(): void {
        this.document.documentElement.classList.replace(ThemeSwitchComponent.DARK_THEME_CLASS, ThemeSwitchComponent.LIGHT_THEME_CLASS);
        this.theme = ThemeSwitchComponent.THEME_LIGHT;
        this.localStorageService.set('theme', ThemeSwitchComponent.THEME_LIGHT);
    }
}
