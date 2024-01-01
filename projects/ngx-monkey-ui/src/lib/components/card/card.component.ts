import { Component, Input, OnChanges, OnInit } from '@angular/core';
import { ThemeService } from '../../services/theme.service';
import { ComponentsStylesService } from '../../services/components-styles.service';

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
  
  @Input() column?: boolean = false;
  
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

  ngOnInit() {
    this.classList = this.componentStylesService.generateClassList(this);
  }

  ngOnChanges() {
    this.classList = this.componentStylesService.generateClassList(this);
  }
  
}
