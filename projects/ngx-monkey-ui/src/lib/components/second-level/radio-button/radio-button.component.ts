import {Component, EventEmitter, Input, Output} from '@angular/core';
import {Styleable} from "../../../bases/styleable.base";
import {ThemeService} from "../../../services/theme.service";

@Component({
  selector: 'monkey-radio-button',
  templateUrl: './radio-button.component.html',
  styleUrls: [
    '../../../styles/components/_common.default.style.scss',
    './radio-button.component.scss',
  ]
})
export class MonkeyRadioButton extends Styleable {

  /**
   * Label of the radio button
   * @type {string}
   */
  @Input() label!: string;

  /**
   * Determines if the radio button is checked
   * @type {boolean}
   * @default false
   */
  @Input() checked: boolean = false;

  /**
   * Event emitted when the value of the radio button changes
   * @type {boolean}
   */
  @Output() valueChanged: EventEmitter<boolean> = new EventEmitter<boolean>();

  /**
   * Observable that indicates whether the dark mode is enabled.
   */
  isDarkMode$ = this.themeService.isDarkMode$;

  constructor(
    private themeService: ThemeService,
  ) {
    super();
  }

  checkChanged(newValue: Boolean) {
    this.valueChanged.emit(newValue.valueOf());
  }

}
