import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Styleable } from '../../bases/styleable.base';
import { ThemeService } from '../../services/theme.service';
import { TooltipService } from '../../services/tooltip/tooltip.service';
import { Tooltipable } from '../../bases/tooltipable.base';
import { MenuOption } from './menu-option.interface';
import { Router } from '@angular/router';

@Component({
  selector: 'monkey-menu',
  templateUrl: './menu.component.html',
  styleUrls: [
    '../../styles/components/_common.default.style.scss',
    './menu.component.scss',
  ]
})
export class MonkeyMenu extends Styleable {

  tooltipable: Tooltipable;

  @Input() title?: string;
  @Input() options!: MenuOption[];
  @Input() selfNavigation?: string = 'false';

  @Output() optionSelected: EventEmitter<MenuOption> = new EventEmitter();

  isDarkMode$ = this.themeService.isDarkMode$;

  alt!: string;
  isFullMenuOpen: boolean = true;

  constructor(
    private themeService: ThemeService,
    private tooltipService: TooltipService,
    private router: Router,
  ) {
    super();
    this.tooltipable = new Tooltipable(this.tooltipService);
  }

  override ngOnInit() {
    super.ngOnInit();
    this.tooltipable.alt = this.alt;
    this.tooltipable.style = this.style;
  }

  override ngOnChanges() {
    super.ngOnChanges();
    this.tooltipable.alt = this.alt;
    this.tooltipable.style = this.style;
    this.screenWidth$.subscribe((value: number) => {
      if (this.isFullMenuOpen && value < this.SMALL_SCREEN_WIDTH) {
        this.isFullMenuOpen = false;
      } else if (!this.isFullMenuOpen && value >= this.SMALL_SCREEN_WIDTH) {
        this.isFullMenuOpen = true;
      }
    });
  }

  onSelectedChanged(option: MenuOption) {
    if (option.route) {
      this.navigateToPage(option);
    }
  }

  navigateToRootPage() {
    this.navigateToPage({ label: this.title || '', route: '/' });
  }

  navigateToPage(menuOption: MenuOption) {
    this.optionSelected.emit(menuOption);
    
    if(this.check(this.selfNavigation)) {
      this.router.navigate([menuOption.route]);
    }
  }

  toggleFullMenu() {
    this.isFullMenuOpen = !this.isFullMenuOpen;
  }

}
