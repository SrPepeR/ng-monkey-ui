import { AfterViewChecked, Component, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { ThemeService } from '../../../services/theme.service';
import { ComponentsStylesService } from '../../../services/components-styles.service';

@Component({
  selector: 'monkey-checkbox',
  templateUrl: './checkbox.component.html',
  styleUrls: [
    './styles/checkbox.component.scss',
    './styles/checkbox.brutalist.component.scss',
    './styles/checkbox.glass.component.scss',
    './styles/checkbox.flat.component.scss',
    './styles/checkbox.ghost.component.scss',
    './styles/checkbox.glow.component.scss',
  ]
})
export class MonkeyCheckbox implements AfterViewChecked {

  @ViewChild('checkbox') checkbox!: any;

  @Input() style?: string = 'primary';

  // COMPONENTS TYPES
  @Input() brutalist?: string = 'true';
  @Input() flat?: string = 'true';
  @Input() ghost?: string = 'true';
  @Input() glass?: string = 'true';
  @Input() glow?: string = 'true';

  // LABELS
  /**
   * The checkbox label.
   * @type string
   */
  @Input() label?: string;

  /**
   * The checkbox state.
   * @type boolean
   */
  @Input() checked?: boolean = false;

  /**
   * Event emitted when the checkbox is checked.
   * @type EventEmitter<Boolean>
   * @returns {Boolean} The checkbox state.
   */
  @Output() onCheckChange = new EventEmitter<Boolean>();

  isDarkMode$ = this.themeService.isDarkMode$;

  classList: Array<string> = [];

  constructor(
    private themeService: ThemeService,
    private componentStylesService: ComponentsStylesService,
  ) { }

  ngAfterViewChecked(): void {
    this.checkbox.nativeElement.checked = this.checked!;
  }

  ngOnChanges() {
    this.classList = this.componentStylesService.generateClassList(this);
  }

  onChanged() {
    this.checked = !this.checked;
    this.onCheckChange.emit(this.checked);
  }

}
