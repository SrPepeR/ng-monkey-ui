import { Component, Input, OnChanges, OnInit } from "@angular/core";

import { ComponentsStylesService } from "../services/components-styles.service";
import { MonkeyScreenService } from "../services/screen/screen.service";
import { MonkeyScreen } from "../services/screen/screen";
import { ScreenSize } from "../services/screen/screen.enum";
import { MonkeyStyle } from "../objects/enums/style.enum";
import {ComponentsSizesService} from "../services/components-sizes.service";

/**
 * Base class for styleable components.
 */
@Component({
	selector: '',
	template: '',
	providers: [
		ComponentsStylesService,
		MonkeyScreenService,
	],
})
/**
 * Represents a base class for styleable components.
 * Provides common style and type properties for components.
 */
export class Styleable implements OnInit, OnChanges {

	private componentStylesService: ComponentsStylesService = new ComponentsStylesService();
	protected screenService: MonkeyScreenService = new MonkeyScreenService();
  private componentSizesService: ComponentsSizesService = new ComponentsSizesService();

	// STYLE
	/**
	 * The style of the component.
	 * Default value: MonkeyStyle.PRIMARY.
	 */
	@Input() style: MonkeyStyle = MonkeyStyle.PRIMARY;

	// COMPONENTS TYPES
	/**
	 * The brutalist type of the component.
	 */
	@Input() brutalist?: string = 'false';

	/**
	 * The flat type of the component.
	 */
	@Input() flat?: string = 'false';

	/**
	 * The ghost type of the component.
	 */
	@Input() ghost?: string = 'false';

	/**
	 * The glass type of the component.
	 */
	@Input() glass?: string = 'false';

	/**
	 * The glow type of the component.
	 */
	@Input() glow?: string = 'false';

	// GENERAL STYLES
	/**
	 * Whether the component should have flex wrap.
	 */
	@Input() flexWrap?: string = 'false';

	/**
	 * Whether the component should have flex wrap-reverse.
	 */
	@Input() flexWrapReverse?: string = 'false';

	/**
	 * Whether the component should have flex-start alignment.
	 */
	@Input() flexStart?: string = 'false';

	/**
	 * Whether the component should have flex-center alignment.
	 */
	@Input() flexCenter?: string = 'false';

	/**
	 * Whether the component should have flex-end alignment.
	 */
	@Input() flexEnd?: string = 'false';

	/**
	 * Whether the component should have sticky positioning.
	 */
	@Input() sticky?: string = 'false';

	/**
	 * Whether the component should be disabled.
	 */
	@Input() disabled?: string = 'false';

  // COMPONENTS SIZES
  /**
   * The size of the loader (extra small).
   * @type string
   * @default 'xs'
   */
  @Input() xs?: string = 'xs';

  /**
   * The size of the loader (small).
   * @type string
   * @default 'sm'
   */
  @Input() sm?: string = 'sm';

  /**
   * The size of the loader (medium).
   * @type string
   * @default 'md'
   */
  @Input() md?: string = 'md';

  /**
   * The size of the loader (large).
   * @type string
   * @default 'lg'
   */
  @Input() lg?: string = 'lg';

  /**
   * The size of the loader (extra large).
   * @type string
   * @default 'xl'
   */
  @Input() xl?: string = 'xl';

	/**
	 * Indicates whether the component is disabled.
	 */
	isDisabledComponent: boolean = false;

	/**
	 * The current screen data.
	 */
	currentScreen!: MonkeyScreen;

	/**
	 * Represents the screen size flag for small screens.
	 */
	SMALL_SCREEN_FLAG: ScreenSize = ScreenSize.SM;

	/**
	 * Represents the success style for MonkeyStyle.
	 */
	styleSuccess: MonkeyStyle = MonkeyStyle.SUCCESS;
	/**
	 * Represents the warning style for MonkeyStyle.
	 */
	styleWarning: MonkeyStyle = MonkeyStyle.WARNING;
	/**
	 * Represents the danger style for MonkeyStyle.
	 */
	styleDanger: MonkeyStyle = MonkeyStyle.DANGER;

	/**
	 * The list of classes to apply to the component.
	 * Default value: [].
	 */
	classList: Array<string> = [];

	constructor() {
		this.currentScreen = this.screenService.getCurrentScreen();
	}

	/**
	 * Initializes the component.
	 * Adds all the necessary classes and subscribes to screen changes.
	 */
	ngOnInit() {
		this.addAllClasses();

		this.screenService.screenChanges$.subscribe((newCurrentScreen: MonkeyScreen) => {
			this.currentScreen = newCurrentScreen;
			this.addAllClasses();
		});
	}

	/**
	 * Called when input properties change.
	 * Adds all the necessary classes and subscribes to screen changes.
	 */
	ngOnChanges() {
		setTimeout(() => {
			this.addAllClasses();

			this.screenService.screenChanges$.subscribe((newCurrentScreen: MonkeyScreen) => {
				this.currentScreen = newCurrentScreen;
				this.addAllClasses();
			});
		}, 300);
	}

	/**
	 * Adds all the necessary classes to the component.
	 */
	private addAllClasses() {
		this.classList = this.componentStylesService.generateClassList(this);
    this.componentSizesService.generateClassList(this);
		this.checkGeneralStyles();
		this.addAditionalClasses();
    this.checkRootComponentsStyles();
	}

  /**
   * Checks the root components styles.
   * @param isAsideOpened The state of the aside.
   */
  checkRootComponentsStyles(isAsideOpened?: boolean) {
    const currentMonkeyRoot = document.getElementById('monkey-root-styles');
    let styleTag;

    let menu = document.querySelector('monkey-menu .menu-container');
    let aside = document.querySelector('monkey-aside-menu');
    let main = document.querySelector('main');

    let css: string = 'body { margin: 0; padding: 0; width: 100%; height: 100%; } ';

    if (menu) {
      css = this.manageGeneralRootStyles(css, menu);
      css += 'monkey-menu { grid-area: menu; } ';
    }

    if (aside) {
      css += 'monkey-aside-menu { grid-area: aside; overflow-y: auto; } '
      css += 'monkey-aside-menu > monkey-card { height: 100%; } ';

      css += '@media (min-width: 1200px) { ';
      css += `app-root { grid-template-columns: 200px 1fr; grid-template-rows: ${menu ? menu.clientHeight : 0}px 1fr; } `;
      css += '} ';
    }

    if (main) {
      css += 'main { grid-area: main; padding-top: 50px; margin-left: auto; margin-right: auto; max-width: 1200px; } ';
    }

    css = this.manageMobileRootStyles(css, isAsideOpened);

    if (currentMonkeyRoot) {
      styleTag = currentMonkeyRoot;
    } else {
      styleTag = document.createElement('style');
      styleTag.id = 'monkey-root-styles';
    }

    styleTag.innerHTML = css;
    document.head.appendChild(styleTag);
  }

  /**
   * Manages the general style of the root component.
   * @param css The current css.
   * @param menu The menu element.
   * @returns The updated css.
   * @private
   **/
  private manageGeneralRootStyles(css: string, menu: Element) {
    css += 'app-root { ';
    css += 'display: grid; ';
    css += `grid-template-columns: 80px 1fr; grid-template-rows: ${menu ? menu.clientHeight : 0}px 1fr; `;
    css += 'width: 100%; height: 100%; ';
    css += 'grid-template-areas: "menu menu" "aside main"; ';
    css += '} ';
    return css;
  }

  /**
   * Manages the mobile style of the root component.
   * @param css The current css.
   * @param isAsideOpened The state of the aside.
   * @returns The updated css.
   * @private
   **/
  private manageMobileRootStyles(css: string, isAsideOpened: boolean | undefined) {
    css += '@media (max-width: 768px) { ';

    if (isAsideOpened == undefined) {
      // Get the previous state of aside
      isAsideOpened = JSON.parse(localStorage.getItem('isAsideOpened') || '{}');
    }
    localStorage.setItem('isAsideOpened', JSON.stringify(isAsideOpened));

    if (isAsideOpened) {
      // Opening aside
      css += 'app-root { grid-template-areas: "menu menu" "aside main"; } ';
    } else {
      // Closing aside
      css += 'app-root { grid-template-areas: "menu menu" "main main"; } ';
    }

    css += '} ';
    return css;
  }

  /**
	 * Checks the general styles of the component.
	 */
	private checkGeneralStyles() {
		if (this.check(this.flexWrap)) {
			this.classList.push('display-flex-wrap');
		}

		if (this.check(this.flexWrapReverse)) {
			this.classList.push('display-flex-wrap-reverse');
		}

		if (this.check(this.flexStart)) {
			this.classList.push('flex-start');
		}

		if (this.check(this.flexCenter)) {
			this.classList.push('flex-center');
		}

		if (this.check(this.flexEnd)) {
			this.classList.push('flex-end');
		}

		if (this.check(this.sticky)) {
			this.classList.push('position-sticky');
		}

		if (this.check(this.disabled)) {
			this.classList.push('disabled');
			this.isDisabledComponent = true;
		}
	}

	/**
	 * Adds additional classes to the component.
	 */
	protected addAditionalClasses() {
		this.classList.push(this.currentScreen.sizeStyleClass);
	}

	/**
	 * Checks if the value is empty.
	 *
	 * @param value The value to check.
	 * @returns True if the value is empty, false otherwise.
	 */
	protected check(value: any) {
		return value === '' || value === 'true' || value === true;
	}

}
