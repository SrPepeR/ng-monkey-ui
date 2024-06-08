import { Component, Input } from '@angular/core';
import { ThemeService } from '../../../services/theme.service';
import { MonkeyInputTextType } from '../../../objects/enums/input-text-type.enum';
import { MonkeyInput } from '../../../bases/input/input.base';

@Component({
  selector: 'monkey-input-text',
  templateUrl: './input-text.component.html',
  styleUrls: [
    '../../../styles/components/_common.default.style.scss',
    '../../../styles/components/_input.default.style.scss',
    '../../../bases/input/styles/input.component.scss',
    '../../../bases/input/styles/input.brutalist.component.scss',
    '../../../bases/input/styles/input.glass.component.scss',
    '../../../bases/input/styles/input.flat.component.scss',
    '../../../bases/input/styles/input.ghost.component.scss',
    '../../../bases/input/styles/input.glow.component.scss',
  ]
})
export class MonkeyInputText extends MonkeyInput {

  /**
   * The type of input for the input text component.
   */
  @Input() inputType: MonkeyInputTextType = MonkeyInputTextType.TEXT;

  /**
   * The type of the input field when it is used as a password input.
   */
  INPUT_PASSWORD_TYPE = MonkeyInputTextType.PASSWORD;

  /**
   * Indicates whether the password is visible or hidden.
   */
  passwordVisible: boolean = false;

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
   * Toggles the visibility of the password in the input field.
   */
  togglePasswordVisibility() {
    this.passwordVisible = !this.passwordVisible;

    if (this.passwordVisible) {
      this.input.nativeElement.type = MonkeyInputTextType.TEXT;
    } else {
      this.input.nativeElement.type = MonkeyInputTextType.PASSWORD;
    }

    this.labelClicked();
  }

}
