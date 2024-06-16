import {AfterViewInit, Component, EventEmitter, Input, OnDestroy, OnInit, Output} from '@angular/core';
import {Styleable} from "../../../bases/styleable.base";
import {ThemeService} from "../../../services/theme.service";
import {Focusable} from "../../../bases/focusable.base";
import {MonkeyFocusService} from "../../../services/focus/focus.service";
import {Focus} from "../../../services/focus/focus";
import {MonkeyButtonData} from "../../../objects/classes/button-data.class";
import {MonkeyStyle} from "../../../objects/enums/style.enum";

@Component({
  selector: 'monkey-modal',
  templateUrl: './modal.component.html',
  styleUrls: [
    '../../../styles/components/_common.default.style.scss',
    './modal.component.scss',
  ]
})
export class MonkeyModal extends Styleable implements OnInit, AfterViewInit, OnDestroy {

  MONKEY_BACKGROUND_STYLE: MonkeyStyle = MonkeyStyle.BACKGROUND;

  MONKEY_DANGER_STYLE: MonkeyStyle = MonkeyStyle.DANGER;

  /**
   * The title of the modal.
   */
  @Input() activationButtonId: string = '';

  /**
   * Determines whether the modal is acceptable.
   */
  @Input() acceptable?: string = 'false';

  /**
   * Event emitted when the modal is accepted.
   */
  @Output() acceptEvent: EventEmitter<void> = new EventEmitter();

  /**
   * Determines whether the modal is skippeable.
   */
  @Input() skippeable?: string = 'false';

  /**
   * Event emitted when the modal is skipped.
   */
  @Output() skipEvent: EventEmitter<void> = new EventEmitter();

  /**
   * Determines whether the modal is showing.
   * Defaults to 'false'.
   */
  showing: boolean = false;

  /**
   * The random id of the modal.
   */
  randomId: string = 'monkey-modal-' + Math.random().toString(36).substring(7);

  /**
   * The possible actions of the modal.
   */
  actions!: MonkeyButtonData[];

  private focusable: Focusable;

  /**
   * Observable that indicates whether the dark mode is enabled.
   */
  isDarkMode$ = this.themeService.isDarkMode$;

  constructor(
    private themeService: ThemeService,
    private focusService: MonkeyFocusService,
  ) {
    super();

    this.focusable = new Focusable(this.focusService);
  }

  override ngOnInit() {
    super.ngOnInit();

    this.actions = [];

    if (this.check(this.acceptable)) {
      this.actions.push(new MonkeyButtonData(MonkeyStyle.SUCCESS, 'Accept', () => this.accept(), 'check', 'right'));
    }

    if (this.check(this.skippeable)) {
      this.actions.push(new MonkeyButtonData(MonkeyStyle.WARNING, 'Skip', () => this.skip(), 'arrow_forward', 'right'));
    }
  }

  ngAfterViewInit(): void {
    document.querySelector(`#${this.activationButtonId}`)?.addEventListener('click', () => {
      this.showing = true;
      setTimeout(() => {
        this.focusable.focusElement(document.querySelector(`#${this.randomId}`)!, true);

        this.focusService.event.subscribe((focus: Focus) => {
          if (!focus || !focus.focusedElement) {
            this.showing = false;
          }
        });
      }, 0);
    });
  }

  ngOnDestroy(): void {
    document.querySelector(`#${this.activationButtonId}`)?.removeEventListener('click', () => {
      this.showing = true;
      this.focusable.unfocusElement();
    });
  }

  /**
   * Accepts the modal.
   * @emits acceptEvent
   */
  accept(): void {
    this.closeModal();
    this.acceptEvent.emit();
  }

  /**
   * Skip the modal.
   * @emits skipEvent
   */
  skip(): void {
    this.closeModal();
    this.skipEvent.emit();
  }

  /**
   * Closes the modal.
   * @private
   */
  closeModal(): void {
    this.showing = false;
    this.focusable.unfocusElement();
  }

  protected readonly close = close;
}
