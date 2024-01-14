import { Component, Input } from '@angular/core';
import { ThemeService } from '../../services/theme.service';
import { ComponentsStylesService } from '../../services/components-styles.service';

@Component({
  selector: 'monkey-switch',
  templateUrl: './switch.component.html',
  styleUrls: [
    './styles/switch.component.scss',
    './styles/switch.brutalist.component.scss',
    './styles/switch.glass.component.scss',
    './styles/switch.flat.component.scss',
    './styles/switch.ghost.component.scss',
    './styles/switch.glow.component.scss',
  ]
})
export class MonkeySwitch {
  
  @Input() style?: string = 'primary';
  
  // COMPONENTS TYPES
  @Input() brutalist?: string = 'true';
  @Input() flat?: string = 'true';
  @Input() ghost?: string = 'true';
  @Input() glass?: string = 'true';
  @Input() glow?: string = 'true';

  // LABELS
  @Input() offLabel?: string = 'OFF';
  @Input() onLabel?: string = 'ON';

  isDarkMode$ = this.themeService.isDarkMode$;

  classList: Array<string> = [];

  constructor(
    private themeService: ThemeService,
    private componentStylesService: ComponentsStylesService,
  ) { }

  ngOnChanges() {
    this.classList = this.componentStylesService.generateClassList(this);
  }

  onSwitch() {
    console.log('switched');
  }

}
