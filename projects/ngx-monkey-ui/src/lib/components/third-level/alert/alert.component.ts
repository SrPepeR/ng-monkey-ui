import { Component, EventEmitter, Input, OnChanges, OnDestroy, OnInit, Output } from '@angular/core';
import { ThemeService } from '../../../services/theme.service';
import { ComponentsStylesService } from '../../../services/components-styles.service';
import { MonkeyAlertService } from '../../../services/alert.service';
import { Subject, takeUntil } from 'rxjs';
import { Message } from './message';

@Component({
  selector: 'monkey-alert',
  templateUrl: './alert.component.html',
  styleUrls: [
    './styles/alert.component.scss'
  ]
})
export class MonkeyAlert implements OnInit, OnChanges, OnDestroy {

  @Input() column?: boolean = false;

  @Input() message: Message = new Message([], 'warning', false);

  @Input() dismissibleText?: string = 'Dismiss';
  @Output() onDismiss = new EventEmitter();

  @Input() acceptable?: string = 'true';
  @Input() acceptText?: string = 'Accept';
  @Output() onAccept = new EventEmitter();

  @Input() rejectable?: string = 'true';
  @Input() rejectText?: string = 'Reject';
  @Output() onReject = new EventEmitter();

  // COMPONENTS TYPES
  @Input() brutalist?: string = 'true';
  @Input() flat?: string = 'true';
  @Input() ghost?: string = 'true';
  @Input() glass?: string = 'true';
  @Input() glow?: string = 'true';

  isDarkMode$ = this.themeService.isDarkMode$;

  classList: Array<string> = [];

  private unsubscribeComponent: Subject<void> = new Subject<void>();

  constructor(
    private themeService: ThemeService,
    private componentStylesService: ComponentsStylesService,
    private alertService: MonkeyAlertService,
  ) { }

  ngOnInit() {
    this.alertService.event
      .pipe(takeUntil(this.unsubscribeComponent))
      .subscribe((message: Message) => {
        this.message = message;
      });

    this.alertService.hide();
  }

  ngOnChanges() {
    this.classList = this.componentStylesService.generateClassList(this);
  }

  ngOnDestroy() {
    this.unsubscribeComponent.next();
    this.unsubscribeComponent.complete();
  }

  dismissSelected() {
    this.dismissAlert();
    this.onDismiss.emit();
  }

  rejectSelected() {
    this.onReject.emit();
    this.dismissAlert();
  }

  acceptSelected() {
    this.onAccept.emit();
    this.dismissAlert();
  }

  private dismissAlert() {
    this.alertService.hide();
  }

  check(param: string | undefined) {
    return param !== 'true';
  }

}
