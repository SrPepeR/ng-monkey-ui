import { Component, Input } from '@angular/core';
import { MonkeyInput } from '../../../bases/input/input.base';
import { MonkeyInputNumberType } from '../../../objects/enums/input-number-type.enum';
import { ThemeService } from '../../../services/theme.service';

@Component({
  selector: 'monkey-input-number',
  templateUrl: './input-number.component.html',
  styleUrls: [
    '../../../styles/components/_input.default.style.scss',
    '../../../bases/input/styles/input.component.scss',
    '../../../bases/input/styles/input.brutalist.component.scss',
    '../../../bases/input/styles/input.glass.component.scss',
    '../../../bases/input/styles/input.flat.component.scss',
    '../../../bases/input/styles/input.ghost.component.scss',
    '../../../bases/input/styles/input.glow.component.scss',
  ]
})
export class MonkeyInputNumber extends MonkeyInput {

  /**
   * The type of input for the input text component.
   */
  @Input() inputType: MonkeyInputNumberType = MonkeyInputNumberType.NUMBER;

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
   * Increases the value of the input by one step.
   * This method updates the input value, focuses on the input element, and reloads the value.
   */
  stepUp(): void {
    this.input.nativeElement.stepUp();
    this.input.nativeElement.focus();
    this.reloadValue();
  }

  /**
   * Decreases the value of the input number by one step.
   */
  stepDown(): void {
    this.input.nativeElement.stepDown();
    this.input.nativeElement.focus();
    this.reloadValue();
  }

  /**
   * Handles the mouse wheel event.
   * @param event - The mouse wheel event.
   */
  onMouseWheel(event: Event): void {
    event.preventDefault();
    if ((event as WheelEvent).deltaY < 0) {
      this.stepUp();
    } else {
      this.stepDown();
    }
  }

  /**
   * Reloads the value of the input field into the form control.
   */
  private reloadValue(): void {
    this.formGroup.get(this.name)!.setValue(this.input.nativeElement.value);
  }

}
