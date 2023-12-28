import { Component, Input } from '@angular/core';

@Component({
  selector: 'monkey-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.scss']
})
export class MonkeyButton {

  @Input() style?: string = 'default';
  @Input() colorScheme?: string = 'light';

}
