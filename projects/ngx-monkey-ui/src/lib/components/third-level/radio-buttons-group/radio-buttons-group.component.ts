import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Styleable} from "../../../bases/styleable.base";
import {ThemeService} from "../../../services/theme.service";

@Component({
  selector: 'monkey-radio-buttons-group',
  templateUrl: './radio-buttons-group.component.html',
  styleUrls: [
    '../../../styles/components/_common.default.style.scss',
    './radio-buttons-group.component.scss',
  ]
})
export class MonkeyRadioButtonsGroup extends Styleable implements OnInit{

  /**
   * Label of the radio buttons
   */
  @Input() label!: string;

  /**
   * Data of the radio buttons
   */
  @Input() options!: {id: number, label: string, selected?: boolean}[];

  /**
   * Id of the selected option
   */
  @Input() selectedOptionId!: number;

  /**
   * Determines if multiple selection is allowed
   */
  @Input() multipleSelection: string = 'false';

  /**
   * Determines if the radio buttons are displayed horizontally
   */
  @Input() horizontal: string = 'false';

  /**
   * Event emitted when the value of the radio buttons changes
   */
  @Output() selectionChanged: EventEmitter<number[]> = new EventEmitter<number[]>();

  /**
   * Observable that indicates whether the dark mode is enabled.
   */
  isDarkMode$ = this.themeService.isDarkMode$;

  constructor(
    private themeService: ThemeService,
  ) {
    super();
  }

  override ngOnInit() {
    this.options.find((option: {id: number, label: string, selected?: boolean}) => this.selectedOptionId && option.id === this.selectedOptionId)!.selected = true;
  }

  /**
   * Clear all the selected options
   * @emits selectionChanged
   */
  clearAll() {
    this.options.forEach((option: {id: number, label: string, selected?: boolean}) => option.selected = false);

    this.emitSelection();
  }

  /**
   * Manage the selection of the radio buttons
   * @param optionId Id of the selected option
   * @emits selectionChanged
   */
  optionSelected(optionId: number) {
    this.options.find((option: {id: number, label: string, selected?: boolean}) => option.id === optionId)!.selected = !this.options.find((option: {id: number, label: string, selected?: boolean}) => option.id === optionId)!.selected;

    if (!this.check(this.multipleSelection)) {
      // Only one option can be selected
      this.options.forEach((option: {id: number, label: string, selected?: boolean}) => option.selected = option.id === optionId);
    }

    this.emitSelection();
  }

  /**
   * Emit the selected options
   * @private
   * @emits selectionChanged
   */
  private emitSelection() {
    this.selectionChanged.emit(
      this.options.filter(
        (option: {id: number, label: string, selected?: boolean}) => option.selected
      ).map(
        (option: {id: number, label: string, selected?: boolean}) => option.id
      )
    );
  }

}
