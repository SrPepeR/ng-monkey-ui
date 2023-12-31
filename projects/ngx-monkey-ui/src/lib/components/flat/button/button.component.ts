import { Component, Input } from '@angular/core';
import { ThemeService } from '../../../services/theme.service';

@Component({
  selector: 'monkey-flat-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.scss']
})
export class MonkeyFlatButton {
  
  @Input() style?: string = 'primary';

  isDarkMode$ = this.themeService.isDarkMode$;

  constructor(
    private themeService: ThemeService,
  ) { }

}
