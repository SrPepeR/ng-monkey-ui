import { AfterViewChecked, AfterViewInit, Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { ThemeService } from '../../services/theme.service';
import { ComponentsStylesService } from '../../services/components-styles.service';

@Component({
  selector: 'monkey-switch',
  templateUrl: './switch.component.html',
  styleUrls: [
    './styles/switch.component.scss',
    './styles/switch.brutalist.component.scss',
    './styles/switch.glass.component.scss',
    './styles/switch.flat.component.scss',
    './styles/switch.ghost.component.scss',
    './styles/switch.glow.component.scss',
  ]
})
export class MonkeySwitch implements AfterViewChecked {

  @ViewChild('switch') switch!: any;

  @Input() style?: string = 'primary';

  // COMPONENTS TYPES
  @Input() brutalist?: string = 'true';
  @Input() flat?: string = 'true';
  @Input() ghost?: string = 'true';
  @Input() glass?: string = 'true';
  @Input() glow?: string = 'true';

  // LABELS
  /**
   * The switch label.
   * @type string
   */
  @Input() offLabel?: string = 'OFF';
  /**
   * The switch label.
   * @type string
   */
  @Input() onLabel?: string = 'ON';

  /**
   * The switch state.
   * @type boolean
   */
  @Input() checked?: boolean = false;

  /**
   * Event emitted when the switch is switched.
   * @type EventEmitter<Boolean>
   */
  @Output() onSwitch = new EventEmitter<Boolean>();

  isDarkMode$ = this.themeService.isDarkMode$;

  classList: Array<string> = [];

  constructor(
    private themeService: ThemeService,
    private componentStylesService: ComponentsStylesService,
  ) { }

  ngAfterViewChecked(): void {
    this.switch.nativeElement.checked = this.checked!;
  }

  ngOnChanges() {
    this.classList = this.componentStylesService.generateClassList(this);
  }

  onSwitched() {
    this.checked = !this.checked;
    this.onSwitch.emit(this.checked);
  }

}
