import { Component, EventEmitter, Output } from '@angular/core';
import { ThemeService } from '../../../services/theme.service';

@Component({
  selector: 'monkey-theme-changer',
  templateUrl: './theme-changer.component.html',
  styleUrls: ['./theme-changer.component.scss']
})
export class MonkeyThemeChanger {

  @Output() onAction = new EventEmitter();

  isDarkMode$ = this.themeService.isDarkMode$;

  constructor(
    private themeService: ThemeService,
  ) { }

  toggleTheme() {
    this.themeService.toggleDarkMode();
    this.onAction.emit();
  }

}
