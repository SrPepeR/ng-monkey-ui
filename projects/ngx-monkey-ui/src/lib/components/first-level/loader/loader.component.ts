import { Component, Input } from '@angular/core';
import { ThemeService } from '../../../services/theme.service';
import { Styleable } from '../../../bases/styleable.base';

/**
 * Represents the MonkeyLoader component.
 */
@Component({
  selector: 'monkey-loader',
  templateUrl: './loader.component.html',
  styleUrls: [
    '../../../styles/components/_common.default.style.scss',
    './styles/loader.component.scss',
    './styles/loader.brutalist.component.scss',
    './styles/loader.glass.component.scss',
    './styles/loader.flat.component.scss',
    './styles/loader.ghost.component.scss',
    './styles/loader.glow.component.scss',
  ]
})
export class MonkeyLoader extends Styleable {

  /**
   * Indicates whether the contrast mode is enabled.
   * @type string
   * @default 'false'
   */
  @Input() contrast?: string = 'false';

  /**
   * The visibility of the loader.
   * @type boolean
   * @default false
   */
  @Input() isVisible: boolean = false;

  /**
   * Observable that indicates whether the dark mode is enabled.
   */
  isDarkMode$ = this.themeService.isDarkMode$;

  constructor(
    private themeService: ThemeService,
  ) {
    super();
  }

}
