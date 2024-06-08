import { Component, EventEmitter, Output } from '@angular/core';
import { ThemeService } from '../../../services/theme.service';

/**
 * Component for changing the theme of the application.
 */
@Component({
  selector: 'monkey-theme-changer',
  templateUrl: './theme-changer.component.html',
  styleUrls: [
    '../../../styles/components/_common.default.style.scss',
    './theme-changer.component.scss'
  ]
})
export class MonkeyThemeChanger {

  /**
   * Event emitter for when an action is performed.
   */
  @Output() onAction = new EventEmitter();

  /**
   * Observable that indicates whether the dark mode is enabled or not.
   */
  isDarkMode$ = this.themeService.isDarkMode$;

  constructor(
    private themeService: ThemeService,
  ) { }

  /**
   * Toggles the theme between light and dark mode.
   * Emits the `onAction` event.
   */
  toggleTheme() {
    this.themeService.toggleDarkMode();
    this.onAction.emit();
  }

}
