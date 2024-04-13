import { Component, Input } from '@angular/core';

import { Styleable } from '../../bases/styleable.base';

@Component({
  selector: 'monkey-list',
  templateUrl: './list.component.html',
  styleUrls: [
    '../../styles/components/_list.default.style.scss',
    './list.component.scss',
  ]
})
export class MonkeyList extends Styleable {

  @Input() horizontal: string = 'false';
  @Input() separators: string = 'false';
  @Input() gapSize: 'sm' | 'md' | 'lg' = 'md';

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
