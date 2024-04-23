import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Styleable } from '../../../bases/styleable.base';
import { ThemeService } from '../../../services/theme.service';
import { MenuOption } from '../../../objects/interfaces/menu-option.interface';
import { Router } from '@angular/router';

@Component({
  selector: 'monkey-aside-menu',
  templateUrl: './aside-menu.component.html',
  styleUrls: [
    '../../../styles/components/_common.default.style.scss',
    './aside-menu.component.scss',
  ]
})
export class MonkeyAsideMenu extends Styleable {

  /**
   * Represents the data for the aside menu component.
   */
  @Input() data!: MenuOption[];

  /**
   * The alternative text for the toggle aside menu button.
   */
  @Input() alt: string = 'Toggle aside menu';

  /**
   * Indicates whether the menu should allow self-navigation.
   */
  @Input() selfNavigation?: string = 'false';

  /**
   * Indicates whether to show a hint or not.
   */
  @Input() showHint?: string = 'false';

  /**
   * Emits an event when a menu option is selected.
   * @event optionSelected
   * @type {EventEmitter<MenuOption>}
   */
  @Output() optionSelected: EventEmitter<MenuOption> = new EventEmitter();

  /**
   * The default icon for the aside menu component.
   */
  DEFAULT_ICON: string = 'navigate_next';

  /**
   * Indicates whether the aside menu is opened or closed.
   */
  isAsideOpened: boolean = false;

  /**
   * The width of the aside menu when it is closed.
   */
  CLOSED_ASIDE_WIDTH: string = '0';

  /**
   * Width of the closed aside hint.
   */
  CLOSED_ASIDE_HINT_WIDTH: string = '80px';

  /**
   * The icon used for closing the aside menu.
   */
  CLOSE_ASIDE_ICON: string = 'arrow_back';

  /**
   * The width of the aside menu when it is opened.
   */
  OPENED_ASIDE_WIDTH: string = '200px';

  /**
   * The icon used to represent the open aside menu state.
   */
  OPEN_ASIDE_ICON: string = 'arrow_forward';

  /**
   * Observable that emits a boolean indicating whether the theme is in dark mode or not.
   */
  isDarkMode$ = this.themeService.isDarkMode$;

  constructor(
    private themeService: ThemeService,
    private router: Router,
  ) {
    super();
  }

  toggleMenu() {
    this.isAsideOpened = !this.isAsideOpened;
  }

  onClicked(option: MenuOption) {
    this.navigateToPage(option);
  }

  /**
   * Navigates to the specified menu option's route.
   * @param option The menu option to navigate to.
   */
  private navigateToPage(option: MenuOption) {
    this.optionSelected.emit(option);
    
    if(this.check(this.selfNavigation)) {
      this.router.navigate([option.route]);
    }
  }

}
