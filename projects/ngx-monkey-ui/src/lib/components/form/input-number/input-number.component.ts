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

}
