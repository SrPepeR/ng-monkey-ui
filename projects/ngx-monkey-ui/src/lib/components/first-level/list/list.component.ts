import { Component, Input } from '@angular/core';

import { Styleable } from '../../../bases/styleable.base';
import { ThemeService } from '../../../services/theme.service';

/**
 * Represents a MonkeyList component.
 */
@Component({
  selector: 'monkey-list',
  templateUrl: './list.component.html',
  styleUrls: [
    '../../../styles/components/_common.default.style.scss',
    './list.component.scss',
  ]
})
export class MonkeyList extends Styleable {

  /**
   * Specifies whether the list items should be displayed horizontally.
   * Default value is 'false'.
   */
  @Input() horizontal: string = 'false';

  /**
   * Specifies whether the list items should have separators.
   * Default value is 'false'.
   */
  @Input() separators: string = 'false';

  /**
   * Specifies the gap size between list items.
   * Possible values are 'sm', 'md', or 'lg'.
   * Default value is 'md'.
   */
  @Input() gapSize: '' | 'sm' | 'md' | 'lg' = 'md';

  /**
   * Observable that emits a boolean indicating whether the theme is in dark mode or not.
   */
  isDarkMode$ = this.themeService.isDarkMode$;

  /**
   * Creates an instance of MonkeyList.
   * @param themeService The theme service.
   */
  constructor(
    private themeService: ThemeService,
  ) {
    super();
  }

  /**
   * Adds additional classes to the class list based on the input properties.
   * Overrides the base class method.
   */
  protected override addAditionalClasses() {
    if (this.check(this.separators)) {
      this.classList.push('separators');
    }

    if (this.check(this.horizontal)) {
      this.classList.push('horizontal');
    }

    this.classList.push(`gap-${this.gapSize}`);
  }

}
