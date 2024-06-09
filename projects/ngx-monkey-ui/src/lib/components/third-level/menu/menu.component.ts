import { Component, EventEmitter, Input, OnDestroy, Output } from '@angular/core';
import { Styleable } from '../../../bases/styleable.base';
import { ThemeService } from '../../../services/theme.service';
import { MonkeyTooltipService } from '../../../services/tooltip/tooltip.service';
import { Tooltipable } from '../../../bases/tooltipable.base';
import { MenuOption } from '../../../objects/interfaces/menu-option.interface';
import { Router } from '@angular/router';

/**
 * Represents a menu component that displays a list of options.
 */
@Component({
  selector: 'monkey-menu',
  templateUrl: './menu.component.html',
  styleUrls: [
    '../../../styles/components/_common.default.style.scss',
    './menu.component.scss',
  ]
})
export class MonkeyMenu extends Styleable implements OnDestroy {

  /**
   * Represents the tooltipable behavior of the menu component.
   */
  tooltipable: Tooltipable;

  /**
   * The title of the menu.
   */
  @Input() title?: string;

  /**
   * The list of menu options.
   */
  @Input() options!: MenuOption[];

  /**
   * Determines whether the menu should navigate to the selected option's route.
   * Defaults to 'false'.
   */
  @Input() selfNavigation?: string = 'false';

  /**
   * Event emitted when a menu option is selected.
   */
  @Output() optionSelected: EventEmitter<MenuOption> = new EventEmitter();

  /**
   * Observable that indicates whether the dark mode is enabled.
   */
  isDarkMode$ = this.themeService.isDarkMode$;

  /**
   * The alternative text for the menu.
   */
  alt!: string;

  /**
   * Determines whether the full menu is open or not.
   * Defaults to true.
   */
  isFullMenuOpen: boolean = false;

  constructor(
    private themeService: ThemeService,
    private tooltipService: MonkeyTooltipService,
    private router: Router,
  ) {
    super();
    this.tooltipable = new Tooltipable(this.tooltipService);
  }

  /**
   * Initializes the component.
   */
  override ngOnInit() {
    super.ngOnInit();
    this.tooltipable.alt = this.alt;
    this.tooltipable.style = this.style;
  }

  /**
   * Handles changes to the component's input properties.
   */
  override ngOnChanges() {
    super.ngOnChanges();
    this.tooltipable.alt = this.alt;
    this.tooltipable.style = this.style;
  }

  ngOnDestroy() {
    this.tooltipable.ngOnDestroy();
  }

  /**
   * Handles the selection of a menu option.
   * @param option The selected menu option.
   */
  onSelectedChanged(option: MenuOption) {
    if (option.route) {
      this.navigateToPage(option);
    }
  }

  /**
   * Navigates to the root page.
   */
  navigateToRootPage() {
    this.navigateToPage({ label: this.title || '', route: '/' });
  }

  /**
   * Navigates to the specified menu option's route.
   * @param menuOption The menu option to navigate to.
   */
  navigateToPage(menuOption: MenuOption) {
    this.optionSelected.emit(menuOption);

    if(this.check(this.selfNavigation)) {
      this.router.navigate([menuOption.route]);
    }
  }

  /**
   * Toggles the full menu open or closed.
   */
  toggleFullMenu() {
    this.isFullMenuOpen = !this.isFullMenuOpen;
    setTimeout(() => {
      this.checkRootComponentsStyles();
    })
  }

}
