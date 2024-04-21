import { Component, EventEmitter, Input, OnChanges, Output } from '@angular/core';
import { ThemeService } from '../../../services/theme.service';
import { Styleable } from '../../../bases/styleable.base';

/**
 * Represents the MonkeyImage component.
 */
@Component({
  selector: 'monkey-image',
  templateUrl: './image.component.html',
  styleUrls: [
    '../../../styles/components/_common.default.style.scss',
    './styles/image.component.scss',
    './styles/image.brutalist.component.scss',
    './styles/image.glass.component.scss',
    './styles/image.flat.component.scss',
    './styles/image.ghost.component.scss',
    './styles/image.glow.component.scss',
  ]
})
export class MonkeyImage extends Styleable implements OnChanges {

  /**
   * Whether the image should have full rounded corners.
   */
  @Input() fullRounded?: string = 'false';

  // PARAMS

  /**
   * The source URL of the image.
   */
  @Input() src!: string;

  /**
   * The alternative text for the image.
   */
  @Input() alt!: string;

  /**
   * The title of the image.
   */
  @Input() title?: string = this.alt;

  /**
   * The width of the image.
   */
  @Input() width?: number = 100;

  /**
   * The height of the image.
   */
  @Input() height?: number = 100;

  /**
   * Event emitted when there is an error loading the image.
   */
  @Output() onLoadingImageError = new EventEmitter();

  /**
   * Event emitted when the image is clicked.
   */
  @Output() onClickImage = new EventEmitter();

  /**
   * Indicates whether the image is currently loading.
   */
  loading: boolean = true;

  /**
   * Observable that indicates whether the dark mode is enabled.
   */
  isDarkMode$ = this.themeService.isDarkMode$;

  constructor(
    private themeService: ThemeService,
  ) {
    super();
  }

  /**
   * Lifecycle hook that is called when any of the input properties change.
   */
  override ngOnChanges() {
    super.ngOnChanges();

    this.loading = true;
  }

  /**
   * Event handler for the 'load' event of the image element.
   * Sets the loading flag to false.
   */
  onLoadImage() {
    this.loading = false;
  }

  /**
   * Event handler for the click event of the image element.
   * Emits the onClickImage event.
   */
  onClick() {
    this.onClickImage.emit();
  }

  /**
   * Event handler for the 'error' event of the image element.
   * Emits the onLoadingImageError event.
   */
  onErrorImage() {
    this.onLoadingImageError.emit();
  }

}
