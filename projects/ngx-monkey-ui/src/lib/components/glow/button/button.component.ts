import { Component, Input } from '@angular/core';
import { ThemeService } from '../../../services/theme.service';

@Component({
  selector: 'monkey-glow-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.scss']
})
export class MonkeyGlowButton {
  
  @Input() style?: string = 'primary';

  isDarkMode$ = this.themeService.isDarkMode$;

  constructor(
    private themeService: ThemeService,
  ) { }

}
