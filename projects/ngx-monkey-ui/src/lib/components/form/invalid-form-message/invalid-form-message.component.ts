import { Component, Input } from '@angular/core';
import { Styleable } from '../../../bases/styleable.base';
import { ThemeService } from '../../../services/theme.service';

@Component({
  selector: 'monkey-invalid-form-message',
  templateUrl: './invalid-form-message.component.html',
  styleUrls: [
    './invalid-form-message.component.scss'
  ]
})
export class InvalidFormMessageComponent extends Styleable {

  /**
   * Component for displaying an invalid form message.
   */
  @Input() text!: string;

  /**
   * The icon to be displayed for the invalid form message.
   */
  @Input() icon!: string;

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
