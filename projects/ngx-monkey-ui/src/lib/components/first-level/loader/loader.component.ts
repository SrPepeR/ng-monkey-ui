import { Component, Input } from '@angular/core';
import { ThemeService } from '../../../services/theme.service';
import { Styleable } from '../../../bases/styleable.base';
import { ComponentsSizesService } from '../../../services/components-sizes.service';

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

  constructor(
    private themeService: ThemeService,
    private componentSizesService: ComponentsSizesService,
  ) {
    super();
  }
  
  /**
   * Initializes the component and sets up any necessary initializations.
   * Overrides the base class's ngOnInit method.
   */
  override ngOnInit() {
    super.ngOnInit();
    this.classList = this.componentSizesService.generateClassList(this);
  }

  /**
   * Called when the input properties change.
   * Generates the CSS class list for the loader.
   */
  override ngOnChanges() {
    super.ngOnChanges();
    this.classList = this.componentSizesService.generateClassList(this);
  }

}
