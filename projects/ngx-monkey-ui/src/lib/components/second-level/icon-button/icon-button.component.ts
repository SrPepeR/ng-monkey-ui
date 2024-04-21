import { Component, EventEmitter, Input, OnChanges, Output } from '@angular/core';
import { ThemeService } from '../../../services/theme.service';
import { TooltipService } from '../../../services/tooltip/tooltip.service';
import { Tooltipable } from '../../../bases/tooltipable.base';
import { Styleable } from '../../../bases/styleable.base';

/**
 * Represents a Monkey Icon Button component.
 */
@Component({
  selector: 'monkey-icon-button',
  templateUrl: './icon-button.component.html',
  styleUrls: [
    '../../../styles/components/_common.default.style.scss',
    './styles/icon-button.component.scss',
  ]
})
export class MonkeyIconButton extends Styleable implements OnChanges {

  /**
   * Represents the tooltipable behavior of the icon button component.
   */
  tooltipable: Tooltipable;

  /**
   * The alternative text for the icon button.
   */
  @Input() alt!: string;

  /**
   * The icon to be displayed on the button.
   */
  @Input() icon?: string = 'warning';

  /**
   * Event emitted when the button is clicked.
   */
  @Output() onClick = new EventEmitter();

  /**
   * Observable that indicates whether the dark mode is enabled.
   */
  isDarkMode$ = this.themeService.isDarkMode$;

  constructor(
    private themeService: ThemeService,
    private tooltipService: TooltipService,
  ) {
    super();
    this.tooltipable = new Tooltipable(this.tooltipService);
  }

  override ngOnInit() {
    super.ngOnInit();
    this.tooltipable.alt = this.alt;
    this.tooltipable.style = this.style;
  }

  override ngOnChanges() {
    super.ngOnChanges();
    this.tooltipable.alt = this.alt;
    this.tooltipable.style = this.style;
  }

  /**
   * Event handler for the button click event.
   */
  onClicked() {
    this.onClick.emit();
  }

  /**
   * Shows the tooltip for the icon button component.
   * 
   * @param event - The mouse event that triggered the tooltip.
   */
  showTooltip(event: MouseEvent) {
    this.tooltipable.showTooltip(event);
  }

  /**
   * Hides the tooltip associated with the icon button.
   */
  hideTooltip() {
    this.tooltipable.hideTooltip();
  }
}
