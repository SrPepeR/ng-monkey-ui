import { AfterViewChecked, Component, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { ThemeService } from '../../../services/theme.service';
import { Styleable } from '../../../bases/styleable.base';

/**
 * Represents a Monkey Checkbox component.
 */
@Component({
  selector: 'monkey-checkbox',
  templateUrl: './checkbox.component.html',
  styleUrls: [
    '../../../styles/components/_common.default.style.scss',
    '../../../styles/components/_checkbox.default.style.scss',
    './styles/checkbox.component.scss',
    './styles/checkbox.brutalist.component.scss',
    './styles/checkbox.glass.component.scss',
    './styles/checkbox.flat.component.scss',
    './styles/checkbox.ghost.component.scss',
    './styles/checkbox.glow.component.scss',
  ]
})
export class MonkeyCheckbox extends Styleable implements AfterViewChecked {

  @ViewChild('checkbox') checkbox!: any;

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

  constructor(
    private themeService: ThemeService,
  ) {
    super();
  }

  /**
   * Lifecycle hook that is called after the component's view has been fully initialized.
   * Sets the initial state of the checkbox.
   */
  ngAfterViewChecked(): void {
    this.checkbox.nativeElement.checked = this.checked!;
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
