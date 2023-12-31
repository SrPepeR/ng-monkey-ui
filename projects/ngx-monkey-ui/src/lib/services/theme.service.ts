import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ThemeService {

  private _isDarkMode = new BehaviorSubject<boolean>(false);
  isDarkMode$ = this._isDarkMode.asObservable();

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
