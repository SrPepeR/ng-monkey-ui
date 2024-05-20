import { Component, EventEmitter, Input, OnChanges, OnInit, Output } from '@angular/core';
import { ThemeService } from '../../../services/theme.service';
import { Styleable } from '../../../bases/styleable.base';

/**
 * Represents a Monkey Button component.
 */
@Component({
  selector: 'monkey-button',
  templateUrl: './button.component.html',
  styleUrls: [
    '../../../styles/components/_common.default.style.scss',
    '../../../styles/components/_button.default.style.scss',
    './styles/button.component.scss',
    './styles/button.brutalist.component.scss',
    './styles/button.flat.component.scss',
    './styles/button.ghost.component.scss',
    './styles/button.glass.component.scss',
    './styles/button.glow.component.scss',
    './styles/button.discreet.component.scss',
  ]
})
export class MonkeyButton extends Styleable implements OnInit, OnChanges {

  /**
   * Whether the button should be squared. Defaults to 'false'.
   */
  @Input() squared?: string = 'false';

	/**
	 * The discreet type of the component.
	 */
	@Input() discreet?: string = 'false';

  /**
   * Event emitted when the button is clicked.
   */
  @Output() onClick = new EventEmitter();

  /**
   * Observable that indicates whether the dark mode is enabled.
   */
  isDarkMode$ = this.themeService.isDarkMode$;

  constructor(
    private themeService: ThemeService,
  ) {
    super();
  }

  /**
   * Handles the button click event.
   */
  onClicked() {
    this.onClick.emit();
  }

}
