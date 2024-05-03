import { Component, Input } from '@angular/core';
import { Styleable } from 'projects/ngx-monkey-ui/src/lib/bases/styleable.base';
import { ThemeService } from 'projects/ngx-monkey-ui/src/lib/services/theme.service';
import { MonkeyStyle } from '../../../objects/enums/style.enum';

@Component({
  selector: 'monkey-header',
  templateUrl: './header.component.html',
  styleUrls: [
    '../../../styles/components/_common.default.style.scss',
    './header.component.scss',
  ]
})
export class MonkeyHeader extends Styleable {
  
  /**
   * Specifies the style of the card.
   */
  @Input() override style: MonkeyStyle = MonkeyStyle.BACKGROUND;

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
