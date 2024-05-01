import { Component, EventEmitter, Input, OnChanges, OnDestroy, Output } from '@angular/core';
import { ThemeService } from '../../../services/theme.service';
import { ComponentsSizesService } from '../../../services/components-sizes.service';
import { TooltipService } from '../../../services/tooltip/tooltip.service';
import { Tooltipable } from '../../../bases/tooltipable.base';
import { MonkeyStyle } from '../../../objects/enums/style.enum';
import { Styleable } from '../../../bases/styleable.base';

/**
 * Represents the MonkeyAvatar component.
 */
@Component({
  selector: 'monkey-avatar',
  templateUrl: './avatar.component.html',
  styleUrls: [
    '../../../styles/components/_common.default.style.scss',
    './avatar.component.scss',
  ]
})
export class MonkeyAvatar extends Styleable implements OnChanges, OnDestroy {

  /**
   * Represents the tooltipable behavior of the avatar component.
   */
  tooltipable: Tooltipable;

  /**
   * The image source for the avatar.
   */
  @Input() image: string = '';

  /**
   * The image source to be used when the main image fails to load.
   */
  @Input() errorImage: string = '';

  /**
   * The form style of the avatar. Possible values: 'rounded', 'square'.
   */
  @Input() form?: string = 'rounded';

  /**
   * Indicates whether the avatar is labeled or not. Possible values: 'true', 'false'.
   */
  @Input() labeled?: string = 'false';

  /**
   * The text to be displayed as a tooltip when the avatar is hovered.
   */
  @Input() text: string = '';

  // COMPONENTS SIZES

  /**
   * The size of the avatar for small screens.
   */
  @Input() sm?: string = 'sm';

  /**
   * The size of the avatar for medium screens.
   */
  @Input() md?: string = 'md';

  /**
   * The size of the avatar for large screens.
   */
  @Input() lg?: string = 'lg';

  /**
   * Event emitted when the avatar image is clicked.
   */
  @Output() onClickImage = new EventEmitter();

  /**
   * Observable that indicates whether the dark mode is enabled or not.
   */
  isDarkMode$ = this.themeService.isDarkMode$;

  /**
   * The size of the avatar.
   */
  size: { width: number, height: number } = { width: 0, height: 0 };

  /**
   * Indicates whether the avatar is labeled or not.
   */
  isLabeled: boolean = false;

  constructor(
    private themeService: ThemeService,
    private componentSizesService: ComponentsSizesService,
    private tooltipService: TooltipService,
  ) {
    super();
    this.tooltipable = new Tooltipable(this.tooltipService);
  }

  /**
   * Lifecycle hook that is called when any of the input properties change.
   */
  override ngOnChanges() {
    super.ngOnChanges();
    this.checkAll();
  }

  ngOnDestroy() {
    this.tooltipable.ngOnDestroy();
  }

  /**
   * Overrides the showTooltip method from the Tooltipable class.
   * Displays the tooltip if the avatar is not labeled.
   * @param event - The mouse event.
   */
  showTooltip(event: MouseEvent) {
    if (this.isLabeled) {
      return;
    }

    this.tooltipService.onShow(this.text, this.style || MonkeyStyle.PRIMARY, { x: event.pageX, y: event.pageY })
  }

  /**
   * Overrides the hideTooltip method from the Tooltipable class.
   * Hides the tooltip if the avatar is not labeled.
   */
  hideTooltip() {
    if (this.isLabeled) {
      return;
    }

    this.tooltipService.hide();
  }

  /**
   * Event handler for the click event on the avatar image.
   * Emits the onClickImage event.
   */
  onClick() {
    this.onClickImage.emit();
  }

  /**
   * Event handler for the error event when the avatar image fails to load.
   * Sets the image source to the errorImage source.
   */
  onErrorImage(): void {
    this.image = this.errorImage;
  }

  /**
   * Checks all the properties and updates the avatar accordingly.
   */
  private checkAll() {
    this.checkClasses();
    this.checkSize();
    this.checkLabeled();
  }

  /**
   * Generates the CSS class list for the avatar based on the properties.
   */
  private checkClasses() {
    this.classList = this.componentSizesService.generateClassList(this);

    this.classList.push(`form-${this.form}`);

    if (this.check(this.labeled)) {
      this.classList.push(`labeled`);
    }

    if (this.form === 'rounded') {
      this.classList.push('full-rounded');
    }
  }

  /**
   * Determines the size of the avatar based on the properties.
   */
  private checkSize() {
    if (this.check(this.sm)) {
      this.size = { width: 35, height: 35 };
    } else if (this.check(this.lg)) {
      this.size = { width: 100, height: 100 };
    } else {
      this.size = { width: 50, height: 50 };
    }
  }

  /**
   * Checks if the avatar is labeled based on the labeled property.
   */
  private checkLabeled() {
    this.isLabeled = this.check(this.labeled);
  }
}
