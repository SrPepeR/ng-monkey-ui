import { Component, Input } from '@angular/core';
import { Styleable } from '../../../bases/styleable.base';
import { MonkeyStyle } from '../../../objects/enums/style.enum';
import { ThemeService } from '../../../services/theme.service';

@Component({
  selector: 'monkey-subheader',
  templateUrl: './subheader.component.html',
  styleUrls: [
    '../../../styles/components/_common.default.style.scss',
    './subheader.component.scss',
  ]
})
export class MonkeySubheader extends Styleable {
  
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
