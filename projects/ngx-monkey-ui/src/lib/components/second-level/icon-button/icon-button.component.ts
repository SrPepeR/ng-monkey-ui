import { Component, EventEmitter, Input, OnChanges, Output } from '@angular/core';
import { ThemeService } from '../../../services/theme.service';
import { ComponentsStylesService } from '../../../services/components-styles.service';
import { TooltipService } from '../../../services/tooltip/tooltip.service';
import { Tooltipable } from '../../../bases/tooltipable.base';

@Component({
  selector: 'monkey-icon-button',
  templateUrl: './icon-button.component.html',
  styleUrls: [
    './styles/icon-button.component.scss',
  ]
})
export class MonkeyIconButton extends Tooltipable implements OnChanges {

  @Input() icon?: string = 'warning';

  // COMPONENTS TYPES
  @Input() brutalist?: string = 'true';
  @Input() flat?: string = 'true';
  @Input() ghost?: string = 'true';
  @Input() glass?: string = 'true';
  @Input() glow?: string = 'true';

  @Output() onClick = new EventEmitter();

  isDarkMode$ = this.themeService.isDarkMode$;

  classList: Array<string> = [];

  constructor(
    private themeService: ThemeService,
    private componentStylesService: ComponentsStylesService,
    tooltipService: TooltipService,
  ) {
    super(tooltipService);
  }

  ngOnChanges() {
    this.classList = this.componentStylesService.generateClassList(this);
    this.classList.push('squared-item');
  }

  onClicked() {
    this.onClick.emit();
  }
}
