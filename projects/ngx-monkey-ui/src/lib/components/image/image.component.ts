import { Component, Input, OnChanges } from '@angular/core';
import { ThemeService } from '../../services/theme.service';
import { ComponentsStylesService } from '../../services/components-styles.service';

@Component({
  selector: 'monkey-image',
  templateUrl: './image.component.html',
  styleUrls: [
    './styles/image.component.scss',
    './styles/image.brutalist.component.scss',
    './styles/image.glass.component.scss',
    './styles/image.flat.component.scss',
    './styles/image.ghost.component.scss',
    './styles/image.glow.component.scss',
  ]
})
export class MonkeyImage implements OnChanges {
  
  @Input() style?: string = 'primary';
  
  // COMPONENTS TYPES
  @Input() brutalist?: string = 'true';
  @Input() flat?: string = 'true';
  @Input() ghost?: string = 'true';
  @Input() glass?: string = 'true';
  @Input() glow?: string = 'true';

  // PARAMS
  @Input() src!: string;
  @Input() alt!: string;
  @Input() title?: string = this.alt;
  @Input() width?: number = 100;
  @Input() height?: number = 100;

  loading: boolean = true;

  isDarkMode$ = this.themeService.isDarkMode$;

  classList: Array<string> = [];

  constructor(
    private themeService: ThemeService,
    private componentStylesService: ComponentsStylesService,
  ) { }

  ngOnChanges() {
    this.classList = this.componentStylesService.generateClassList(this);

    this.loading = true;
  }

  onLoadImage() {
    // this.loading = false;
  }

}
