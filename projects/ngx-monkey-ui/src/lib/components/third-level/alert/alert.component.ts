import { Component, EventEmitter, Input, OnChanges, OnDestroy, OnInit, Output } from '@angular/core';
import { ThemeService } from '../../../services/theme.service';
import { MonkeyAlertService } from '../../../services/alert.service';
import { Subject, takeUntil } from 'rxjs';
import { Message } from './message';
import { Styleable } from '../../../bases/styleable.base';

/**
 * Represents the MonkeyAlert component.
 * This component displays an alert message with optional dismiss, accept, and reject actions.
 */
@Component({
  selector: 'monkey-alert',
  templateUrl: './alert.component.html',
  styleUrls: [
    '../../../styles/components/_common.default.style.scss',
    './styles/alert.component.scss'
  ]
})
export class MonkeyAlert extends Styleable implements OnInit, OnChanges, OnDestroy {

  /**
   * Specifies whether the alert should be displayed in a column layout.
   */
  @Input() column?: boolean = false;

  /**
   * The message to be displayed in the alert.
   */
  @Input() message: Message = new Message([], this.styleWarning, false);

  /**
   * The text to be displayed for the dismiss action.
   */
  @Input() dismissibleText: string = 'Dismiss';
  
  /**
   * Event emitted when the dismiss action is triggered.
   */
  @Output() onDismiss = new EventEmitter();

  /**
   * Specifies whether the alert can be accepted.
   */
  @Input() acceptable?: string = 'true';
  
  /**
   * The text to be displayed for the accept action.
   */
  @Input() acceptText: string = 'Accept';
  
  /**
   * Event emitted when the accept action is triggered.
   */
  @Output() onAccept = new EventEmitter();

  /**
   * Specifies whether the alert can be rejected.
   */
  @Input() rejectable?: string = 'true';
  
  /**
   * The text to be displayed for the reject action.
   */
  @Input() rejectText: string = 'Reject';
  
  /**
   * Event emitted when the reject action is triggered.
   */
  @Output() onReject = new EventEmitter();

  /**
   * Observable that indicates whether the application is in dark mode.
   */
  isDarkMode$ = this.themeService.isDarkMode$;

  /**
   * Subject used to unsubscribe from observables when the component is destroyed.
   */
  private unsubscribeComponent: Subject<void> = new Subject<void>();

  constructor(
    private themeService: ThemeService,
    private alertService: MonkeyAlertService,
  ) {
    super();
  }

  /**
   * Initializes the component.
   * Subscribes to the alertService event to receive alert messages.
   * Hides the alert initially.
   */
  override ngOnInit() {
    super.ngOnInit();
    this.alertService.event
      .pipe(takeUntil(this.unsubscribeComponent))
      .subscribe((message: Message) => {
        this.message = message;
      });

    this.alertService.hide();
  }

  /**
   * Cleans up resources when the component is destroyed.
   */
  ngOnDestroy() {
    this.unsubscribeComponent.next();
    this.unsubscribeComponent.complete();
  }

  /**
   * Dismisses the alert and emits the onDismiss event.
   */
  dismissSelected() {
    this.dismissAlert();
    this.onDismiss.emit();
  }

  /**
   * Emits the onReject event and dismisses the alert.
   */
  rejectSelected() {
    this.onReject.emit();
    this.dismissAlert();
  }

  /**
   * Emits the onAccept event and dismisses the alert.
   */
  acceptSelected() {
    this.onAccept.emit();
    this.dismissAlert();
  }

  /**
   * Hides the alert using the alertService.
   */
  private dismissAlert() {
    this.alertService.hide();
  }

}
