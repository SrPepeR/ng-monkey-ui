import { AfterViewChecked, Component, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { ThemeService } from '../../../services/theme.service';
import { Styleable } from '../../../bases/styleable.base';

/**
 * Represents a Monkey Switch component.
 */
@Component({
  selector: 'monkey-switch',
  templateUrl: './switch.component.html',
  styleUrls: [
    '../../../styles/components/_common.default.style.scss',
    './styles/switch.component.scss',
    './styles/switch.brutalist.component.scss',
    './styles/switch.glass.component.scss',
    './styles/switch.flat.component.scss',
    './styles/switch.ghost.component.scss',
    './styles/switch.glow.component.scss',
  ]
})
export class MonkeySwitch extends Styleable implements AfterViewChecked {

  @ViewChild('switch') switch!: any;

  // LABELS
  /**
   * The label for the off state of the switch.
   * @type string
   */
  @Input() offLabel?: string = 'OFF';
  /**
   * The label for the on state of the switch.
   * @type string
   */
  @Input() onLabel?: string = 'ON';

  /**
   * The state of the switch.
   * @type boolean
   */
  @Input() checked?: boolean = false;

  /**
   * Event emitted when the switch is toggled.
   * @type EventEmitter<Boolean>
   */
  @Output() onSwitch = new EventEmitter<Boolean>();

  /**
   * Observable that indicates whether the dark mode is enabled.
   * @type Observable<boolean>
   */
  isDarkMode$ = this.themeService.isDarkMode$;

  constructor(
    private themeService: ThemeService,
  ) {
    super();
  }

  /**
   * Lifecycle hook that is called after the component's view has been fully initialized.
   */
  ngAfterViewChecked(): void {
    this.switch.nativeElement.checked = this.checked!;
  }

  /**
   * Event handler for when the switch is toggled.
   */
  onSwitched() {
    this.checked = !this.checked;
    this.onSwitch.emit(this.checked);
  }

}
