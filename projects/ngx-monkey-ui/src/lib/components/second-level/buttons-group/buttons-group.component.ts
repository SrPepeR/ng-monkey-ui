import { Component, Input } from '@angular/core';
import { Styleable } from '../../../bases/styleable.base';
import { ThemeService } from '../../../services/theme.service';
import { MonkeyButtonData } from '../../../objects/classes/button-data.class';

@Component({
  selector: 'monkey-buttons-group',
  templateUrl: './buttons-group.component.html',
  styleUrls: [
    '../../../styles/components/_common.default.style.scss',
    './buttons-group.component.scss',
  ]
})
export class MonkeyButtonsGroup extends Styleable {

  @Input() gap: string = 'false';

  @Input() data: MonkeyButtonData[] = [];

  /**
   * Observable that emits a boolean indicating whether the theme is in dark mode or not.
   */
  isDarkMode$ = this.themeService.isDarkMode$;

  /**
   * Creates an instance of MonkeyButtonsGroup.
   * @param themeService The theme service.
   */
  constructor(
    private themeService: ThemeService,
  ) {
    super();
  }

}
