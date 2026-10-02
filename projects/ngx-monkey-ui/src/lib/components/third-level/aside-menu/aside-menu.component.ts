import {
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import { Styleable } from '../../../bases/styleable.base';
import { ThemeService } from '../../../services/theme.service';
import { MenuOption } from '../../../objects/interfaces/menu-option.interface';
import { Router } from '@angular/router';
import { MonkeyScreen } from '../../../services/screen/screen';
import { ScreenSize } from '../../../services/screen/screen.enum';
import { MonkeyStyle } from '../../../objects/enums/style.enum';

@Component({
  selector: 'monkey-aside-menu',
  templateUrl: './aside-menu.component.html',
  styleUrls: [
    '../../../styles/components/_common.default.style.scss',
    './aside-menu.component.scss',
  ],
})
export class MonkeyAsideMenu extends Styleable implements OnInit, OnChanges {
  /**
   * Represents the data for the aside menu component.
   */
  @Input() data!: MenuOption[];

  /**
   * The alternative text for the toggle aside menu button.
   */
  @Input() alt = 'Toggle aside menu';

  /**
   * Indicates whether the menu should allow self-navigation.
   */
  @Input() selfNavigation?: string = 'false';

  /**
   * Indicates whether to show a hint or not.
   */
  @Input() showHint?: string = 'false';

  /**
   * Represents the currently selected menu option.
   */
  @Input() currentOption?: MenuOption;

  /**
   * Emits an event when a menu option is selected.
   * @event optionSelected
   * @type {EventEmitter<MenuOption>}
   */
  @Output() optionSelected = new EventEmitter<MenuOption>();

  /**
   * The default icon for the aside menu component.
   */
  DEFAULT_ICON = 'navigate_next';

  /**
   * Indicates whether the aside menu is opened or closed.
   */
  isAsideOpened = false;

  /**
   * The width of the aside menu when it is closed.
   */
  CLOSED_ASIDE_WIDTH = '0';

  /**
   * Width of the closed aside hint.
   */
  CLOSED_ASIDE_HINT_WIDTH = '80px';

  /**
   * Determines whether the hint should be shown or not.
   */
  canShowHint = true;

  /**
   * The icon used for closing the aside menu.
   */
  CLOSE_ASIDE_ICON = 'arrow_back';

  /**
   * The width of the aside menu when it is opened.
   */
  OPENED_ASIDE_WIDTH = '200px';

  /**
   * The icon used to represent the open aside menu state.
   */
  OPEN_ASIDE_ICON = 'arrow_forward';

  /**
   * Indicates whether the menu should be opened by toggle.
   */
  openByToggle = false;

  backgroundStyle: MonkeyStyle = MonkeyStyle.BACKGROUND;

  openedByLongScreen = false;

  /**
   * Observable that emits a boolean indicating whether the theme is in dark mode or not.
   */
  isDarkMode$ = this.themeService.isDarkMode$;

  /**
   * The content of this aside menu, whose width changes when it opens and closes.
   */
  @ViewChild('asideContent', { read: ElementRef, static: true })
  private asideContent?: ElementRef<HTMLElement>;

  constructor(
    private themeService: ThemeService,
    private router: Router,
  ) {
    super();
  }

  /**
   * Initializes the component.
   * This method is called after the component has been created and initialized.
   */
  override ngOnInit() {
    super.ngOnInit();

    if (this.data?.length) {
      const firstOption = this.data[0];
      this.currentOption = firstOption.children?.length ? firstOption.children[0] : firstOption;
    }

    this.changeAsideWidth();
  }

  /**
   * Handles changes to the component's input properties.
   */
  override ngOnChanges() {
    super.ngOnChanges();

    this.screenService.screenChanges$.subscribe((currentScreen: MonkeyScreen) => {
      if (currentScreen.isScreenSizeUp(ScreenSize.XL)) {
        this.openedByLongScreen = true;
        this.openMenu();
      } else {
        this.openedByLongScreen = false;
        this.closeMenu();
      }

      if (!this.check(this.showHint)) {
        this.canShowHint = false;
        return;
      }

      this.canShowHint = currentScreen.isScreenSizeUp(ScreenSize.MD);
    });

    this.changeAsideWidth();
  }

  /**
   * Toggles the menu between opened and closed states.
   */
  toggleMenu() {
    if (this.isAsideOpened) {
      this.closeMenu();
      return;
    }

    this.openByToggle = true;
    this.openMenu();
  }

  /**
   * Opens the aside menu.
   */
  openMenu() {
    this.isAsideOpened = true;
    this.changeAsideWidth();
  }

  /**
   * Closes the aside menu.
   */
  closeMenu() {
    this.isAsideOpened = false;
    this.openByToggle = false;
    this.changeAsideWidth();
  }

  private changeAsideWidth() {
    const asideContent = this.asideContent?.nativeElement;
    if (!asideContent) {
      return;
    }

    if (this.openedByLongScreen) {
      asideContent.style.width = this.OPENED_ASIDE_WIDTH;
      return;
    }

    if (!this.isAsideOpened) {
      if (this.check(this.showHint) && this.canShowHint) {
        asideContent.style.width = this.CLOSED_ASIDE_HINT_WIDTH;
        return;
      }
      asideContent.style.width = this.CLOSED_ASIDE_WIDTH;
      return;
    }

    asideContent.style.width = this.OPENED_ASIDE_WIDTH;
    return;
  }

  /**
   * Handles the click event for a menu option.
   *
   * @param option - The selected menu option.
   */
  onClicked(option: MenuOption) {
    this.manageAsideMenu();
    this.currentOption = option;
    this.navigateToPage(option);
  }

  /**
   * Navigates to the specified menu option's route.
   * @param option The menu option to navigate to.
   */
  private navigateToPage(option: MenuOption) {
    this.optionSelected.emit(option);

    if (this.check(this.selfNavigation)) {
      this.router.navigate([option.route]);
    }
  }
}
