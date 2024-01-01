import { Component, Input, OnChanges } from '@angular/core';
import { ThemeService } from '../../services/theme.service';
import { ComponentsStylesService } from '../../services/components-styles.service';

@Component({
  selector: 'monkey-button',
  templateUrl: './button.component.html',
  styleUrls: [
    './styles/button.component.scss',
    './styles/button.brutalist.component.scss',
    './styles/button.flat.component.scss',
    './styles/button.ghost.component.scss',
    './styles/button.glass.component.scss',
    './styles/button.glow.component.scss',
  ]
})
export class MonkeyButton implements OnChanges {
  
  @Input() style?: string = 'primary';
  
  // COMPONENTS TYPES
  @Input() brutalist?: string = 'true';
  @Input() flat?: string = 'true';
  @Input() ghost?: string = 'true';
  @Input() glass?: string = 'true';
  @Input() glow?: string = 'true';

  isDarkMode$ = this.themeService.isDarkMode$;

  classList: Array<string> = [];

  constructor(
    private themeService: ThemeService,
    private componentStylesService: ComponentsStylesService,
  ) { }

  ngOnChanges() {
    this.classList = this.componentStylesService.generateClassList(this);
  }

}
