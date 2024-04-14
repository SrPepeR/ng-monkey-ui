import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Styleable } from '../../bases/styleable.base';
import { DropdownOption } from './dropdown-option.interface';
import { ThemeService } from '../../services/theme.service';
import { Tooltipable } from '../../bases/tooltipable.base';
import { TooltipService } from '../../services/tooltip/tooltip.service';

@Component({
  selector: 'monkey-dropdown',
  templateUrl: './dropdown.component.html',
  styleUrls: [
    '../../styles/components/_common.default.style.scss',
    './dropdown.component.scss',
  ]
})
export class MonkeyDropdown extends Styleable implements OnInit {

  tooltipable: Tooltipable;

  @Input() alt!: string;
  @Input() separators: string = 'false';
  @Input() options!: DropdownOption[];
  @Input() selected?: DropdownOption;

  @Output() selectedChanged: EventEmitter<DropdownOption> = new EventEmitter();

  isDarkMode$ = this.themeService.isDarkMode$;

  isOpen: boolean = false;

  constructor(
    private themeService: ThemeService,
    private tooltipService: TooltipService,
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
  }

  toggleDropdown() {
    this.isOpen = !this.isOpen;
  }

  selectOption(option: DropdownOption) {
    this.selected = option;
    this.isOpen = false;
    this.selectedChanged.emit(option);
  }

  showTooltip(event: MouseEvent) {
    if (this.selected) {
      this.tooltipable.showTooltip(event);
    }
  }

  hideTooltip() {
    if (this.selected) {
      this.tooltipable.hideTooltip();
    }
  }

}
