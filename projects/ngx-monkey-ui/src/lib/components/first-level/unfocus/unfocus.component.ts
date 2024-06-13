import { Component, OnDestroy, OnInit } from '@angular/core';
import { Focusable } from '../../../bases/focusable.base';
import { Focus } from '../../../services/focus/focus';
import { Subject, takeUntil } from 'rxjs';
import { ThemeService } from '../../../services/theme.service';
import { MonkeyFocusService } from '../../../services/focus/focus.service';

@Component({
  selector: 'monkey-unfocus',
  templateUrl: './unfocus.component.html',
  styleUrls: ['./unfocus.component.scss']
})
export class MonkeyUnfocus implements OnInit, OnDestroy {

  /**
   * Represents a focusable element.
   */
  focusable: Focusable;

  /**
   * Represents the focus data for the Unfocus component.
   */
  focusData: Focus = new Focus();

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
    private focusService: MonkeyFocusService,
  ) {
    this.focusable = new Focusable(this.focusService);
  }

  /**
   * Initializes the component.
   */
  ngOnInit() {
    this.focusService.event
      .pipe(takeUntil(this.unsubscribeComponent))
      .subscribe((focusData: Focus) => {
        this.focusData = focusData;
      });

    this.focusService.unfocus();
  }

  /**
   * Lifecycle hook that is called when the component is about to be destroyed.
   */
  ngOnDestroy() {
    this.unsubscribeComponent.next();
    this.unsubscribeComponent.complete();
    this.focusable.ngOnDestroy();
  }

}
