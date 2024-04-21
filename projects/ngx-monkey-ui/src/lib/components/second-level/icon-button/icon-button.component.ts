import { Component, EventEmitter, Input, OnChanges, Output } from '@angular/core';
import { ThemeService } from '../../../services/theme.service';
import { ComponentsStylesService } from '../../../services/components-styles.service';
import { TooltipService } from '../../../services/tooltip/tooltip.service';
import { Tooltipable } from '../../../bases/tooltipable.base';

/**
 * Represents a Monkey Icon Button component.
 */
@Component({
  selector: 'monkey-icon-button',
  templateUrl: './icon-button.component.html',
  styleUrls: [
    './styles/icon-button.component.scss',
  ]
})
export class MonkeyIconButton extends Tooltipable implements OnChanges {

  /**
   * The icon to be displayed on the button.
   */
  @Input() icon?: string = 'warning';

  // COMPONENTS TYPES
  /**
   * The brutalist style of the button.
   */
  @Input() brutalist?: string = 'true';
  /**
   * The flat style of the button.
   */
  @Input() flat?: string = 'true';
  /**
   * The ghost style of the button.
   */
  @Input() ghost?: string = 'true';
  /**
   * The glass style of the button.
   */
  @Input() glass?: string = 'true';
  /**
   * The glow style of the button.
   */
  @Input() glow?: string = 'true';

  /**
   * Event emitted when the button is clicked.
   */
  @Output() onClick = new EventEmitter();

  /**
   * Observable that indicates whether the dark mode is enabled.
   */
  isDarkMode$ = this.themeService.isDarkMode$;

  /**
   * Array of CSS classes for the button.
   */
  classList: Array<string> = [];

  constructor(
    private themeService: ThemeService,
    private componentStylesService: ComponentsStylesService,
    tooltipService: TooltipService,
  ) {
    super(tooltipService);
  }

  /**
   * Lifecycle hook that is called when any of the input properties change.
   */
  ngOnChanges() {
    this.classList = this.componentStylesService.generateClassList(this);
    this.classList.push('squared-item');
  }

  /**
   * Event handler for the button click event.
   */
  onClicked() {
    this.onClick.emit();
  }
}
