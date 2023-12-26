import { Component, Input } from '@angular/core';

@Component({
  selector: 'monkey-button',
  templateUrl: './button.component.html',
  styleUrls: [
    './button.component.scss',
    './styles/button-default.component.scss',
    './styles/button-brutalist.component.scss',
    './styles/button-glassmorphism.component.scss',
    './styles/button-flat.component.scss',
    './styles/button-ghost.component.scss',
    './styles/button-glow.component.scss',
  ]
})
export class MonkeyButton {

  @Input() style?: string = 'default';
  @Input() colorScheme?: string = 'light';

}
