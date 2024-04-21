import { AfterViewChecked, Component, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { ThemeService } from '../../../services/theme.service';
import { ComponentsStylesService } from '../../../services/components-styles.service';

/**
 * Represents a Monkey Switch component.
 */
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
export class MonkeySwitch implements AfterViewChecked {

  @ViewChild('switch') switch!: any;

  /**
   * The style of the switch.
   * @type string
   */
  @Input() style?: string = 'primary';

  // COMPONENTS TYPES
  /**
   * Determines whether the brutalist style is enabled.
   * @type string
   */
  @Input() brutalist?: string = 'false';
  /**
   * Determines whether the flat style is enabled.
   * @type string
   */
  @Input() flat?: string = 'false';
  /**
   * Determines whether the ghost style is enabled.
   * @type string
   */
  @Input() ghost?: string = 'false';
  /**
   * Determines whether the glass style is enabled.
   * @type string
   */
  @Input() glass?: string = 'false';
  /**
   * Determines whether the glow style is enabled.
   * @type string
   */
  @Input() glow?: string = 'false';

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

  /**
   * Array of CSS classes for the switch component.
   * @type Array<string>
   */
  classList: Array<string> = [];

  constructor(
    private themeService: ThemeService,
    private componentStylesService: ComponentsStylesService,
  ) { }

  /**
   * Lifecycle hook that is called after the component's view has been fully initialized.
   */
  ngAfterViewChecked(): void {
    this.switch.nativeElement.checked = this.checked!;
  }

  /**
   * Lifecycle hook that is called when any of the input properties change.
   */
  ngOnChanges() {
    this.classList = this.componentStylesService.generateClassList(this);
  }

  /**
   * Event handler for when the switch is toggled.
   */
  onSwitched() {
    this.checked = !this.checked;
    this.onSwitch.emit(this.checked);
  }

}
