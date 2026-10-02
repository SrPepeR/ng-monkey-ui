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

  /**
   * Key of the user's choice in `localStorage`.
   */
  private readonly THEME_STORAGE_KEY = 'theme';

  /**
   * Whether the user has chosen a theme. While they have not, the theme follows the system.
   */
  private hasUserChoice = false;

  constructor() {
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)');
    const storedTheme = localStorage.getItem(this.THEME_STORAGE_KEY);
    this.hasUserChoice = storedTheme === 'dark' || storedTheme === 'light';

    this._isDarkMode.next(this.hasUserChoice ? storedTheme === 'dark' : prefersDark.matches);

    prefersDark.addEventListener('change', (event) => {
      if (!this.hasUserChoice) {
        this._isDarkMode.next(event.matches);
      }
    });
  }

  /**
   * Toggles the dark mode of the application and stores the choice in `localStorage`.
   */
  toggleDarkMode() {
    const isDarkMode = !this._isDarkMode.value;

    this.hasUserChoice = true;
    localStorage.setItem(this.THEME_STORAGE_KEY, isDarkMode ? 'dark' : 'light');
    this._isDarkMode.next(isDarkMode);
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
