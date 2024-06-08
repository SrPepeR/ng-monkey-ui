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

	/**
	 * Determines whether the aside menu should be managed automatically.
	 */
	automaticAsideMenuManagement: boolean = true;

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
		this.checkSpecialComponents();
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

	private checkSpecialComponents() {
		this.addClassesToMainElement();
		if (this.automaticAsideMenuManagement) {
			this.manageAsideMenu();
		}
	}

	/**
	 * Sets the status of automatic aside menu management.
	 *
	 * @param status - The status to set for automatic aside menu management.
	 */
	setAutomaticAsideMenuManagement(status: boolean) {
		this.automaticAsideMenuManagement = status;
	}

	/**
	 * Manages the aside menu by changing the main margin left and adding styles to the aside menu.
	 * @returns A promise that resolves to a boolean indicating whether any changes were made.
	 */
	manageAsideMenu(): Promise<boolean> {
		return new Promise((resolve) => {
			let changes = false;
			const asideMenu = document.querySelector('#aside-menu-content');
			const asideMenuWidth = asideMenu?.clientWidth || 0;

			changes = this.changeMainMarginLeft(asideMenuWidth);
			changes = this.addStylesToAsideMenuWhenMenu() || changes;

			resolve(changes);
		});
	}

	/**
	 * Changes the left margin of the main element by the specified number of pixels.
	 * @param pixels - The number of pixels to set as the left margin.
	 * @returns `true` if changes were made, `false` otherwise.
	 */
	private changeMainMarginLeft(pixels: number): boolean {
		const main = document.querySelector('main');
		if (main) {
			main.style.marginLeft = `${pixels}px`;
			return true;
		}

		return false;
	}

	/**
	 * Adds classes to the main element based on the current screen size style class.
	 */
	private addClassesToMainElement() {
		const main = document.querySelector('main');
		if (main) {
			main.removeAttribute('class');
			main.classList.add(this.currentScreen.sizeStyleClass);
		}
	}

	/**
	 * Adds styles to the aside menu based on the menu content.
	 * @returns {boolean} Returns true if the styles were successfully added, false otherwise.
	 */
	private addStylesToAsideMenuWhenMenu(): boolean {
		const menu: HTMLElement | null = document.querySelector('monkey-menu .menu-content');
		const asideMenu: HTMLElement | null = document.querySelector('monkey-aside-menu .aside-menu');

		if (menu && asideMenu) {
			(asideMenu as HTMLElement).style.top = `${menu.clientHeight}px`;
			(asideMenu as HTMLElement).style.height = `${document.body.clientHeight - menu.clientHeight}px`;

			return true;
		}

		return false;
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
