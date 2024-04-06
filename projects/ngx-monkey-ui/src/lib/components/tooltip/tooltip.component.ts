import { Component, EventEmitter, Input, OnChanges, OnDestroy, OnInit, Output } from '@angular/core';
import { ThemeService } from '../../services/theme.service';
import { ComponentsStylesService } from '../../services/components-styles.service';
import { Tooltip } from '../../services/tooltip/tooltip';
import { Subject, takeUntil } from 'rxjs';
import { TooltipService } from '../../services/tooltip/tooltip.service';

@Component({
  selector: 'monkey-tooltip',
  templateUrl: './tooltip.component.html',
  styleUrls: [
    './styles/tooltip.component.scss',
  ]
})
export class MonkeyTooltip implements OnInit, OnChanges, OnDestroy {
  
  @Input() tooltip: Tooltip = new Tooltip('', '', undefined);
  
  // COMPONENTS TYPES
  @Input() brutalist?: string = 'true';
  @Input() flat?: string = 'true';
  @Input() ghost?: string = 'true';
  @Input() glass?: string = 'true';
  @Input() glow?: string = 'true';

  @Output() onClick = new EventEmitter();

  isDarkMode$ = this.themeService.isDarkMode$;

  classList: Array<string> = [];

  private unsubscribeComponent: Subject<void> = new Subject<void>();

  constructor(
    private themeService: ThemeService,
    private componentStylesService: ComponentsStylesService,
    private tooltipService: TooltipService,
  ) { }

  ngOnInit() {
    this.tooltipService.event
      .pipe(takeUntil(this.unsubscribeComponent))
      .subscribe((tooltip: Tooltip) => {
        this.tooltip = tooltip;
      });

    this.tooltipService.hide();
  }

  ngOnChanges() {
    this.classList = this.componentStylesService.generateClassList(this);
  }

  ngOnDestroy() {
    this.unsubscribeComponent.next();
    this.unsubscribeComponent.complete();
  }

}
