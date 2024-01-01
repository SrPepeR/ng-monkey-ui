import { Component, Input, OnInit } from '@angular/core';
import { ThemeService } from '../../../services/theme.service';

@Component({
  selector: 'monkey-glow-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss']
})
export class MonkeyGlowCard {
  
  @Input() column?: boolean = false;

  isDarkMode$ = this.themeService.isDarkMode$;

  constructor(
    private themeService: ThemeService,
  ) { }
  
}
