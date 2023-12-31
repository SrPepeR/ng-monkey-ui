import { Component, Input } from '@angular/core';
import { ThemeService } from '../../../services/theme.service';

@Component({
  selector: 'monkey-ghost-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss']
})
export class MonkeyGhostCard {
  
  @Input() column?: boolean = false;
  @Input() style?: string = 'primary';

  isDarkMode$ = this.themeService.isDarkMode$;

  constructor(
    private themeService: ThemeService,
  ) { }
  
}
