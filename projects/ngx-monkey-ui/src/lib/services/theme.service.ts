import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ThemeService {

  private _isDarkMode = new BehaviorSubject<boolean>(false);
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

  toggleDarkMode() {
    this._isDarkMode.next(!this._isDarkMode.value);
  }

  get isDarkMode() {
    return this._isDarkMode.value;
  }

  get isLightMode() {
    return !this._isDarkMode.value;
  }
  
}
