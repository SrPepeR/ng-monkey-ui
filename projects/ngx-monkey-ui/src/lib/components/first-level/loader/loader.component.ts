import { Component, Input } from '@angular/core';
import { ComponentsStylesService } from '../../../services/components-styles.service';
import { ThemeService } from '../../../services/theme.service';
import { ComponentsSizesService } from '../../../services/components-sizes.service';

/**
 * Represents the MonkeyLoader component.
 */
@Component({
  selector: 'monkey-loader',
  templateUrl: './loader.component.html',
  styleUrls: [
    './styles/loader.component.scss',
    './styles/loader.brutalist.component.scss',
    './styles/loader.glass.component.scss',
    './styles/loader.flat.component.scss',
    './styles/loader.ghost.component.scss',
    './styles/loader.glow.component.scss',
  ]
})
export class MonkeyLoader {

  /**
   * The style of the loader.
   * @type string
   * @default 'primary'
   */
  @Input() style?: string = 'primary';

  // COMPONENTS TYPES

  /**
   * Indicates whether the brutalist loader is enabled.
   * @type string
   * @default 'true'
   */
  @Input() brutalist?: string = 'true';

  /**
   * Indicates whether the flat loader is enabled.
   * @type string
   * @default 'true'
   */
  @Input() flat?: string = 'true';

  /**
   * Indicates whether the ghost loader is enabled.
   * @type string
   * @default 'true'
   */
  @Input() ghost?: string = 'true';

  /**
   * Indicates whether the glass loader is enabled.
   * @type string
   * @default 'true'
   */
  @Input() glass?: string = 'true';

  /**
   * Indicates whether the glow loader is enabled.
   * @type string
   * @default 'true'
   */
  @Input() glow?: string = 'true';

  /**
   * Indicates whether the contrast mode is enabled.
   * @type string
   * @default 'true'
   */
  @Input() contrast?: string = 'true';

  // COMPONENTS SIZES

  /**
   * The size of the loader (extra small).
   * @type string
   * @default 'xs'
   */
  @Input() xs?: string = 'xs';

  /**
   * The size of the loader (small).
   * @type string
   * @default 'sm'
   */
  @Input() sm?: string = 'sm';

  /**
   * The size of the loader (medium).
   * @type string
   * @default 'md'
   */
  @Input() md?: string = 'md';

  /**
   * The size of the loader (large).
   * @type string
   * @default 'lg'
   */
  @Input() lg?: string = 'lg';

  /**
   * The size of the loader (extra large).
   * @type string
   * @default 'xl'
   */
  @Input() xl?: string = 'xl';

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

  /**
   * Array of CSS class names for the loader.
   */
  classList: Array<string> = [];

  constructor(
    private themeService: ThemeService,
    private componentStylesService: ComponentsStylesService,
    private componentSizesService: ComponentsSizesService,
  ) { }

  /**
   * Called when the input properties change.
   * Generates the CSS class list for the loader.
   */
  ngOnChanges() {
    this.classList = this.componentStylesService.generateClassList(this);
    this.classList = this.componentSizesService.generateClassList(this);
  }

}
