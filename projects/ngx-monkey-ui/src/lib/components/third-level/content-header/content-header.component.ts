import { Component } from '@angular/core';
import { Styleable } from '../../../bases/styleable.base';

@Component({
  selector: 'monkey-content-header',
  templateUrl: './content-header.component.html',
  styleUrls: [
    '../../../styles/components/_common.default.style.scss',
    './content-header.component.scss',
  ]
})
export class MonkeyContentHeader extends Styleable {

}
