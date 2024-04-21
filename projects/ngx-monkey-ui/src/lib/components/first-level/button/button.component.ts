import { Component, EventEmitter, Input, OnChanges, OnInit, Output } from '@angular/core';
import { ThemeService } from '../../../services/theme.service';
import { ComponentsStylesService } from '../../../services/components-styles.service';

/**
 * Represents a Monkey Button component.
 */
@Component({
  selector: 'monkey-button',
  templateUrl: './button.component.html',
  styleUrls: [
    './styles/button.component.scss',
    './styles/button.brutalist.component.scss',
    './styles/button.flat.component.scss',
    './styles/button.ghost.component.scss',
    './styles/button.glass.component.scss',
    './styles/button.glow.component.scss',
  ]
})
export class MonkeyButton implements OnInit, OnChanges {
  
  /**
   * The style of the button. Defaults to 'primary'.
   */
  @Input() style: string = 'primary';

  /**
   * Whether the button should be squared. Defaults to 'false'.
   */
  @Input() squared?: string = 'false';
  
  // COMPONENTS TYPES

  /**
   * Whether the button has brutalist style. Defaults to 'false'.
   */
  @Input() brutalist?: string = 'false';

  /**
   * Whether the button has flat style. Defaults to 'false'.
   */
  @Input() flat?: string = 'false';

  /**
   * Whether the button has ghost style. Defaults to 'false'.
   */
  @Input() ghost?: string = 'false';

  /**
   * Whether the button has glass style. Defaults to 'false'.
   */
  @Input() glass?: string = 'false';

  /**
   * Whether the button has glow style. Defaults to 'false'.
   */
  @Input() glow?: string = 'false';

  /**
   * Event emitted when the button is clicked.
   */
  @Output() onClick = new EventEmitter();

  /**
   * Observable that indicates whether the dark mode is enabled.
   */
  isDarkMode$ = this.themeService.isDarkMode$;

  /**
   * Array of CSS class names for the button.
   */
  classList: Array<string> = [];

  constructor(
    private themeService: ThemeService,
    private componentStylesService: ComponentsStylesService,
  ) { }

  /**
   * Initializes the component.
   */
  ngOnInit() {
    this.classList = this.componentStylesService.generateClassList(this);
  }

  /**
   * Called when input properties change.
   */
  ngOnChanges() {
    this.classList = this.componentStylesService.generateClassList(this);
  }

  /**
   * Handles the button click event.
   */
  onClicked() {
    this.onClick.emit();
  }

}
