import { Component, Input } from '@angular/core';

import { Styleable } from '../../../bases/styleable.base';
import { ThemeService } from '../../../services/theme.service';

@Component({
  selector: 'monkey-list',
  templateUrl: './list.component.html',
  styleUrls: [
    '../../../styles/components/_common.default.style.scss',
    './list.component.scss',
  ]
})
export class MonkeyList extends Styleable {

  @Input() horizontal: string = 'false';
  @Input() separators: string = 'false';
  @Input() gapSize: 'sm' | 'md' | 'lg' = 'md';

  isDarkMode$ = this.themeService.isDarkMode$;

  constructor(
    private themeService: ThemeService,
  ) {
    super();
  }

  protected override addAditionalClasses() {
    if (this.check(this.separators)) {
      this.classList.push('separators');
    }

    if (this.check(this.horizontal)) {
      this.classList.push('horizontal');
    }

    this.classList.push(`gap-${this.gapSize}`);
  }

}
