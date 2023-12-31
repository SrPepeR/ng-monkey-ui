import { Component, Input } from '@angular/core';
import { ThemeService } from '../../../services/theme.service';

@Component({
  selector: 'monkey-glass-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.scss']
})
export class MonkeyGlassButton {
  
  @Input() style?: string = 'primary';

  isDarkMode$ = this.themeService.isDarkMode$;

  constructor(
    private themeService: ThemeService,
  ) { }

}
