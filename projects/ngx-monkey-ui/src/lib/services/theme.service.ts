import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

/**
 * Service responsible for managing the theme of the application.
 */
@Injectable({
  providedIn: 'root',
})
export class ThemeService {

  /**
   * Represents the current dark mode state.
   */
  private _isDarkMode = new BehaviorSubject<boolean>(false);

  /**
   * Observable that emits the current dark mode state.
   */
  isDarkMode$ = this._isDarkMode.asObservable();

  constructor() {
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)');
    const hasTheme = localStorage.getItem('theme');
    if (hasTheme) {
      this._isDarkMode.next(hasTheme === 'dark');
    } else {
      this._isDarkMode.next(prefersDark.matches);
    }
  }

  /**
   * Toggles the dark mode of the application.
   */
  toggleDarkMode() {
    this.saveThemeOnLocalStorage();
    this._isDarkMode.next(!this._isDarkMode.value);
  }


  /**
   * Saves the current theme preference to the local storage.
   * The theme preference is determined by the negation of `_isDarkMode` BehaviorSubject's value.
   * If `_isDarkMode` is false, 'dark' is stored, otherwise 'light' is stored.
   */
  saveThemeOnLocalStorage(): void {
    localStorage.setItem('theme', !this._isDarkMode.value ? 'dark' : 'light');
  }

  /**
   * Returns whether the application is in dark mode.
   */
  get isDarkMode() {
    return this._isDarkMode.value;
  }

  /**
   * Returns whether the application is in light mode.
   */
  get isLightMode() {
    return !this._isDarkMode.value;
  }

}
