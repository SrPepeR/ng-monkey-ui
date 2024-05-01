import { Component, Input, ViewChild } from '@angular/core';
import { Styleable } from '../../../bases/styleable.base';
import { FormGroup } from '@angular/forms';
import { ThemeService } from '../../../services/theme.service';

@Component({
  selector: 'monkey-input-text',
  templateUrl: './input-text.component.html',
  styleUrls: [
    '../../../styles/components/_common.default.style.scss',
    './input-text.component.scss',
  ]
})
export class MonkeyInputText extends Styleable {

  /**
   * The input element.
   */
  @ViewChild('input') input: any;

  /**
   * The label for the text input.
   */
  @Input() label: string = 'Text input';

  /**
   * The alternative text for the input element.
   */
  @Input() alt?: string;

  /**
   * Represents the form group that the input text component belongs to.
   */
  @Input() formGroup!: FormGroup;

  /**
   * The name of the input field.
   */
  @Input() name!: string;

  /**
   * Indicates whether the input is required or not.
   * 
   * @remarks
   * The value of this property should be a string representation of a boolean value ('true' or 'false').
   * If set to 'true', the input will be marked as required.
   * If set to 'false' (default), the input will not be marked as required.
   */
  @Input() required: string = 'false';

  // ICONS

  /**
   * The icon to be displayed alongside the input field.
   */
  @Input() icon?: string;

  /**
   * The icon to be displayed when the input is valid.
   */
  @Input() validIcon?: string = 'check_circle';

  /**
   * The icon to display when the input is invalid.
   * Defaults to 'cancel'.
   */
  @Input() invalidIcon?: string = 'cancel';

  /**
   * The icon to be displayed for the required field indicator.
   * Defaults to 'star'.
   */
  @Input() requiredIcon?: string = 'star';

  /**
   * Determines the width of the input component.
   * 
   * @remarks
   * The `wFull` property accepts a string value that specifies the width of the input component.
   * 
   * @defaultValue 'false'
   */
  @Input() wFull: string = 'false';

  /**
   * Indicates whether the input text is deleteable or not.
   * If set to 'true', a delete button will be displayed next to the input text.
   * If set to 'false' (default), no delete button will be displayed.
   */
  @Input() deleteable: string = 'false';

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
   * Handles the click event on the label element.
   * Sets focus on the input element.
   */
  labelClicked() {
    this.input.nativeElement.focus();
  }
  
  /**
   * Resets the input value to its initial state.
   */
  resetInput() {
    this.formGroup.get(this.name)?.reset();
  }

}