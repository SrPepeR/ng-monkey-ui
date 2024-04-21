import { Component, EventEmitter, Input, OnChanges, OnDestroy, OnInit, Output } from '@angular/core';
import { ThemeService } from '../../../services/theme.service';
import { ComponentsStylesService } from '../../../services/components-styles.service';
import { Tooltip } from '../../../services/tooltip/tooltip';
import { Subject, takeUntil } from 'rxjs';
import { TooltipService } from '../../../services/tooltip/tooltip.service';

/**
 * Represents the MonkeyTooltip component.
 */
@Component({
  selector: 'monkey-tooltip',
  templateUrl: './tooltip.component.html',
  styleUrls: [
    './styles/tooltip.component.scss',
  ]
})
export class MonkeyTooltip implements OnInit, OnChanges, OnDestroy {
  
  /**
   * The tooltip input property.
   */
  @Input() tooltip: Tooltip = new Tooltip('', '', undefined);
  
  // COMPONENTS TYPES
  /**
   * The brutalist input property.
   */
  @Input() brutalist?: string = 'false';
  /**
   * The flat input property.
   */
  @Input() flat?: string = 'false';
  /**
   * The ghost input property.
   */
  @Input() ghost?: string = 'false';
  /**
   * The glass input property.
   */
  @Input() glass?: string = 'false';
  /**
   * The glow input property.
   */
  @Input() glow?: string = 'false';

  /**
   * The onClick output event.
   */
  @Output() onClick = new EventEmitter();

  /**
   * Observable that indicates whether the dark mode is enabled or not.
   */
  isDarkMode$ = this.themeService.isDarkMode$;

  /**
   * Array of CSS class names.
   */
  classList: Array<string> = [];

  /**
   * Subject used to unsubscribe from observables.
   */
  private unsubscribeComponent: Subject<void> = new Subject<void>();

  constructor(
    private themeService: ThemeService,
    private componentStylesService: ComponentsStylesService,
    private tooltipService: TooltipService,
  ) { }

  /**
   * Lifecycle hook that is called after the component has been initialized.
   */
  ngOnInit() {
    this.tooltipService.event
      .pipe(takeUntil(this.unsubscribeComponent))
      .subscribe((tooltip: Tooltip) => {
        this.tooltip = tooltip;
      });

    this.tooltipService.hide();
  }

  /**
   * Lifecycle hook that is called when any input property changes.
   */
  ngOnChanges() {
    this.classList = this.componentStylesService.generateClassList(this);
  }

  /**
   * Lifecycle hook that is called when the component is about to be destroyed.
   */
  ngOnDestroy() {
    this.unsubscribeComponent.next();
    this.unsubscribeComponent.complete();
  }

}
