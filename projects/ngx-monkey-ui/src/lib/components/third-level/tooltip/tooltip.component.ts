import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { ThemeService } from '../../../services/theme.service';
import { Tooltip } from '../../../services/tooltip/tooltip';
import { Subject, takeUntil } from 'rxjs';
import { TooltipService } from '../../../services/tooltip/tooltip.service';
import { MonkeyStyle } from '../../../objects/enums/style.enum';
import { Styleable } from '../../../bases/styleable.base';
import { Tooltipable } from '../../../bases/tooltipable.base';

/**
 * Represents the MonkeyTooltip component.
 */
@Component({
  selector: 'monkey-tooltip',
  templateUrl: './tooltip.component.html',
  styleUrls: [
    '../../../styles/components/_common.default.style.scss',
    './styles/tooltip.component.scss',
  ]
})
export class MonkeyTooltip extends Styleable implements OnInit, OnDestroy {

  /**
   * Represents the tooltipable behavior of the tooltip component.
   */
  tooltipable: Tooltipable;
  
  /**
   * The tooltip input property.
   */
  @Input() tooltip: Tooltip = new Tooltip(MonkeyStyle.NONE, '', undefined);

  /**
   * The onClick output event.
   */
  @Output() onClick = new EventEmitter();

  /**
   * Observable that indicates whether the dark mode is enabled or not.
   */
  isDarkMode$ = this.themeService.isDarkMode$;

  /**
   * Subject used to unsubscribe from observables.
   */
  private unsubscribeComponent: Subject<void> = new Subject<void>();

  constructor(
    private themeService: ThemeService,
    private tooltipService: TooltipService,
  ) {
    super();
    this.tooltipable = new Tooltipable(this.tooltipService);
  }

  /**
   * Lifecycle hook that is called after the component has been initialized.
   */
  override ngOnInit() {
    this.tooltipService.event
      .pipe(takeUntil(this.unsubscribeComponent))
      .subscribe((tooltip: Tooltip) => {
        this.tooltip = tooltip;
      });

    this.tooltipService.hide();
  }

  /**
   * Lifecycle hook that is called when the component is about to be destroyed.
   */
  ngOnDestroy() {
    this.unsubscribeComponent.next();
    this.unsubscribeComponent.complete();
    this.tooltipable.ngOnDestroy();
  }

}
