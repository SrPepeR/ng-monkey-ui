import { Component, Input, OnChanges, OnInit } from '@angular/core';
import { ThemeService } from '../../../services/theme.service';
import { ComponentsStylesService } from '../../../services/components-styles.service';

/**
 * Represents a Monkey Card component.
 */
@Component({
  selector: 'monkey-card',
  templateUrl: './card.component.html',
  styleUrls: [
    './styles/card.component.scss',
    './styles/card.brutalist.component.scss',
    './styles/card.flat.component.scss',
    './styles/card.ghost.component.scss',
    './styles/card.glass.component.scss',
    './styles/card.glow.component.scss',
  ]
})
export class MonkeyCard implements OnInit, OnChanges {
  
  /**
   * Specifies whether the card should be displayed in a column layout.
   */
  @Input() column?: boolean = false;
  
  /**
   * Specifies the style of the card.
   */
  @Input() style?: string = 'background';
  
  // COMPONENTS TYPES
  
  /**
   * Specifies whether the brutalist style should be applied to the card.
   */
  @Input() brutalist?: string = 'true';
  
  /**
   * Specifies whether the flat style should be applied to the card.
   */
  @Input() flat?: string = 'true';
  
  /**
   * Specifies whether the ghost style should be applied to the card.
   */
  @Input() ghost?: string = 'true';
  
  /**
   * Specifies whether the glass style should be applied to the card.
   */
  @Input() glass?: string = 'true';
  
  /**
   * Specifies whether the glow style should be applied to the card.
   */
  @Input() glow?: string = 'true';

  /**
   * Specifies whether padding should be removed from the card.
   */
  @Input() noPadding?: string = 'true';
  
  /**
   * Specifies whether margin should be removed from the card.
   */
  @Input() noMargin?: string = 'true';
  
  /**
   * Specifies whether the flex-wrap should be reversed for the card.
   */
  @Input() displayFlexWrapReverse?: string = 'true';

  /**
   * Observable that emits the current dark mode state.
   */
  isDarkMode$ = this.themeService.isDarkMode$;

  /**
   * Array of CSS class names to be applied to the card.
   */
  classList: Array<string> = [];

  constructor(
    private themeService: ThemeService,
    private componentStylesService: ComponentsStylesService,
  ) { }

  /**
   * Initializes the component.
   */
  ngOnInit() {
    this.classList = this.componentStylesService.generateClassList(this);
  }

  /**
   * Called whenever the input properties change.
   */
  ngOnChanges() {
    this.classList = this.componentStylesService.generateClassList(this);
  }
  
}
