import {Component, ElementRef, EventEmitter, Input, OnDestroy, OnInit, Output, ViewChild} from '@angular/core';
import { Styleable } from '../../../bases/styleable.base';
import { DropdownOption } from '../../../objects/interfaces/dropdown-option.interface';
import { ThemeService } from '../../../services/theme.service';
import { Tooltipable } from '../../../bases/tooltipable.base';
import { MonkeyTooltipService } from '../../../services/tooltip/tooltip.service';
import { Focusable } from "../../../bases/focusable.base";
import { MonkeyFocusService } from "../../../services/focus/focus.service";
import { Focus } from "../../../services/focus/focus";

/**
 * Represents a dropdown component that allows users to select an option from a list.
 */
@Component({
  selector: 'monkey-dropdown',
  templateUrl: './dropdown.component.html',
  styleUrls: [
    '../../../styles/components/_common.default.style.scss',
    './dropdown.component.scss',
  ]
})
export class MonkeyDropdown extends Styleable implements OnInit, OnDestroy {

  focuseable: Focusable;

  randomId: string = Math.random().toString(36).substring(7);

  /**
   * Represents the tooltipable behavior of the dropdown component.
   */
  tooltipable: Tooltipable;

  /**
   * The alternative text for the dropdown component.
   */
  @Input() alt!: string;

  /**
   * Indicates whether separators should be displayed between dropdown options.
   */
  @Input() separators: string = 'false';

  /**
   * The list of options for the dropdown.
   */
  @Input() options!: DropdownOption[];

  /**
   * The currently selected option in the dropdown.
   */
  @Input() selected?: DropdownOption;

  /**
   * Event emitted when the selected option is changed.
   */
  @Output() selectedChanged: EventEmitter<DropdownOption> = new EventEmitter();

  /**
   * Observable that indicates whether the dark mode is enabled.
   */
  isDarkMode$ = this.themeService.isDarkMode$;

  /**
   * Indicates whether the dropdown is open or closed.
   */
  isOpen: boolean = false;

  constructor(
    private themeService: ThemeService,
    private tooltipService: MonkeyTooltipService,
    private focusService: MonkeyFocusService,
  ) {
    super();
    this.tooltipable = new Tooltipable(this.tooltipService);
    this.focuseable = new Focusable(focusService);
  }

  /**
   * Initializes the dropdown component.
   */
  override ngOnInit() {
    super.ngOnInit();
    this.tooltipable.alt = this.alt;
    this.tooltipable.style = this.style;

    this.focusService.event.subscribe((focusData: Focus) => {
      // Menu should be closed when the focus is lost.
      if (!focusData.focusedElement) {
        this.isOpen = false;
        return;
      }
    })
  }

  /**
   * Handles changes to the input properties of the dropdown component.
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
   * Toggles the dropdown open or closed.
   */
  toggleDropdown() {
    this.isOpen = !this.isOpen;

    setTimeout(() => {
      if (this.isOpen) {
        this.focuseable.focusElement(document.querySelector(`#dropdown-${this.randomId}`)!);
      } else {
        this.focuseable.unfocusElement();
      }
    }, 0);
  }

  /**
   * Selects the specified option in the dropdown.
   * @param option - The option to be selected.
   */
  selectOption(option: DropdownOption) {
    this.selected = option;
    this.isOpen = false;
    this.selectedChanged.emit(option);
    this.focuseable.unfocusElement();
  }

  /**
   * Shows the tooltip for the currently selected option.
   * @param event - The mouse event that triggered the tooltip.
   */
  showTooltip(event: MouseEvent) {
    if (this.selected) {
      this.tooltipable.showTooltip(event);
    }
  }

  /**
   * Hides the tooltip for the currently selected option.
   */
  hideTooltip() {
    if (this.selected) {
      this.tooltipable.hideTooltip();
    }
  }

}
