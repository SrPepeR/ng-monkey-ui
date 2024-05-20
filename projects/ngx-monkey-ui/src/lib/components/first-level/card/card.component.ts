import { Component, Input, OnChanges, OnInit } from '@angular/core';
import { ThemeService } from '../../../services/theme.service';
import { Styleable } from '../../../bases/styleable.base';
import { MonkeyStyle } from '../../../objects/enums/style.enum';

/**
 * Represents a Monkey Card component.
 */
@Component({
  selector: 'monkey-card',
  templateUrl: './card.component.html',
  styleUrls: [
    '../../../styles/components/_common.default.style.scss',
    '../../../styles/components/_card.default.style.scss',
    './styles/card.component.scss',
    './styles/card.brutalist.component.scss',
    './styles/card.flat.component.scss',
    './styles/card.ghost.component.scss',
    './styles/card.glass.component.scss',
    './styles/card.glow.component.scss',
  ]
})
export class MonkeyCard extends Styleable implements OnInit, OnChanges {
  
  /**
   * Specifies whether the card should be displayed in a column layout.
   */
  @Input() column?: boolean = false;
  
  /**
   * Specifies the style of the card.
   */
  @Input() override style: MonkeyStyle = MonkeyStyle.BACKGROUND;

  /**
   * Specifies whether padding should be removed from the card.
   */
  @Input() noPadding?: string = 'false';
  
  /**
   * Specifies whether margin should be removed from the card.
   */
  @Input() noMargin?: string = 'false';
  
  /**
   * Specifies whether the flex-wrap should be reversed for the card.
   */
  @Input() displayFlexWrapReverse?: string = 'false';

  /**
   * Observable that emits the current dark mode state.
   */
  isDarkMode$ = this.themeService.isDarkMode$;

  constructor(
    private themeService: ThemeService,
  ) {
    super();
  }
  
}
