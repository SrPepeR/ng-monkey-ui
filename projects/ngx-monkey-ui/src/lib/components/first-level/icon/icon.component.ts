import { Component, Input } from '@angular/core';
import { Styleable } from '../../../bases/styleable.base';
import { ThemeService } from '../../../services/theme.service';

@Component({
  selector: 'monkey-icon',
  templateUrl: './icon.component.html',
  styleUrls: [
    '../../../styles/components/_common.default.style.scss',
    './icon.component.scss',
  ]
})
export class MonkeyIcon extends Styleable {

  /**
   * The icon to be displayed.
   */
  @Input() icon!: string;

  /**
   * Observable that emits a boolean indicating whether the theme is in dark mode or not.
   */
  isDarkMode$ = this.themeService.isDarkMode$;

  constructor(
    private themeService: ThemeService,
  ) {
    super();
  }

}
