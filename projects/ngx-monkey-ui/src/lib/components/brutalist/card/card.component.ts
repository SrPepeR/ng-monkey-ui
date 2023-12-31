import { Component, Input } from '@angular/core';
import { ThemeService } from '../../../services/theme.service';

@Component({
  selector: 'monkey-brutalist-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss']
})
export class MonkeyBrutalistCard {
  
  @Input() column?: boolean = false;
  @Input() style?: string = 'primary';

  isDarkMode$ = this.themeService.isDarkMode$;

  constructor(
    private themeService: ThemeService,
  ) { }
  
}
