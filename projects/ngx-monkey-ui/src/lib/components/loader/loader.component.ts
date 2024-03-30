import { Component, Input } from '@angular/core';
import { ComponentsStylesService } from '../../services/components-styles.service';
import { ThemeService } from '../../services/theme.service';
import { ComponentsSizesService } from '../../services/components-sizes.service';

@Component({
  selector: 'monkey-loader',
  templateUrl: './loader.component.html',
  styleUrls: [
    './styles/loader.component.scss',
    './styles/loader.brutalist.component.scss',
    './styles/loader.glass.component.scss',
    './styles/loader.flat.component.scss',
    './styles/loader.ghost.component.scss',
  ]
})
export class MonkeyLoader {

  @Input() style?: string = 'primary';

  // COMPONENTS TYPES
  @Input() brutalist?: string = 'true';
  @Input() flat?: string = 'true';
  @Input() ghost?: string = 'true';
  @Input() glass?: string = 'true';
  @Input() glow?: string = 'true';
  
  @Input() contrast?: string = 'true';

  // COMPONENTS SIZES
  @Input() xs?: string = 'xs';
  @Input() sm?: string = 'sm';
  @Input() md?: string = 'md';
  @Input() lg?: string = 'lg';
  @Input() xl?: string = 'xl';

  /**
   * The loader visibility.
   * @type boolean
   * @default false
   */
  @Input() isVisible: boolean = false;

  isDarkMode$ = this.themeService.isDarkMode$;

  classList: Array<string> = [];

  constructor(
    private themeService: ThemeService,
    private componentStylesService: ComponentsStylesService,
    private componentSizesService: ComponentsSizesService,
  ) { }

  ngOnChanges() {
    this.classList = this.componentStylesService.generateClassList(this);
    this.classList = this.componentSizesService.generateClassList(this);
  }

}
