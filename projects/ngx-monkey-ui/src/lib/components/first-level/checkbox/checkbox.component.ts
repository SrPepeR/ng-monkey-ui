import { AfterViewChecked, Component, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { ThemeService } from '../../../services/theme.service';
import { ComponentsStylesService } from '../../../services/components-styles.service';

/**
 * Represents a Monkey Checkbox component.
 */
@Component({
  selector: 'monkey-checkbox',
  templateUrl: './checkbox.component.html',
  styleUrls: [
    './styles/checkbox.component.scss',
    './styles/checkbox.brutalist.component.scss',
    './styles/checkbox.glass.component.scss',
    './styles/checkbox.flat.component.scss',
    './styles/checkbox.ghost.component.scss',
    './styles/checkbox.glow.component.scss',
  ]
})
export class MonkeyCheckbox implements AfterViewChecked {

  @ViewChild('checkbox') checkbox!: any;

  /**
   * The style of the checkbox.
   * @type string
   */
  @Input() style?: string = 'primary';

  // COMPONENTS TYPES
  /**
   * Determines whether the brutalist style is enabled.
   * @type string
   */
  @Input() brutalist?: string = 'true';

  /**
   * Determines whether the flat style is enabled.
   * @type string
   */
  @Input() flat?: string = 'true';

  /**
   * Determines whether the ghost style is enabled.
   * @type string
   */
  @Input() ghost?: string = 'true';

  /**
   * Determines whether the glass style is enabled.
   * @type string
   */
  @Input() glass?: string = 'true';

  /**
   * Determines whether the glow style is enabled.
   * @type string
   */
  @Input() glow?: string = 'true';

  // LABELS
  /**
   * The checkbox label.
   * @type string
   */
  @Input() label?: string;

  /**
   * The checkbox state.
   * @type boolean
   */
  @Input() checked?: boolean = false;

  /**
   * Event emitted when the checkbox is checked.
   * @type EventEmitter<Boolean>
   * @returns {Boolean} The checkbox state.
   */
  @Output() onCheckChange = new EventEmitter<Boolean>();

  /**
   * Observable that indicates whether the dark mode is enabled.
   */
  isDarkMode$ = this.themeService.isDarkMode$;

  /**
   * Array of CSS class names for the checkbox.
   */
  classList: Array<string> = [];

  constructor(
    private themeService: ThemeService,
    private componentStylesService: ComponentsStylesService,
  ) { }

  /**
   * Lifecycle hook that is called after the component's view has been fully initialized.
   * Sets the initial state of the checkbox.
   */
  ngAfterViewChecked(): void {
    this.checkbox.nativeElement.checked = this.checked!;
  }

  /**
   * Lifecycle hook that is called when any of the input properties change.
   * Generates the class list for the checkbox.
   */
  ngOnChanges() {
    this.classList = this.componentStylesService.generateClassList(this);
  }

  /**
   * Event handler for the checkbox change event.
   * Toggles the checkbox state and emits the onCheckChange event.
   */
  onChanged() {
    this.checked = !this.checked;
    this.onCheckChange.emit(this.checked);
  }

}
