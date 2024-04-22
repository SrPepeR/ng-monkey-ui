import { Component, Input, OnChanges, OnInit } from "@angular/core";

import { ComponentsStylesService } from "../services/components-styles.service";
import { MonkeyScreenService } from "../services/screen/screen.service";
import { MonkeyScreen } from "../services/screen/screen";
import { ScreenSize } from "../services/screen/screen.enum";
import { MonkeyStyle } from "../objects/enums/style.enum";

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
		this.addAllClasses();

		this.screenService.screenChanges$.subscribe((newCurrentScreen: MonkeyScreen) => {
			this.currentScreen = newCurrentScreen;
			this.addAllClasses();
		});
	}

	/**
	 * Adds all the necessary classes to the component.
	 */
	private addAllClasses() {
		this.classList = this.componentStylesService.generateClassList(this);
		this.checkGeneralStyles();
		this.addAditionalClasses();
	}

	/**
	 * Checks the general styles of the component.
	 */
	private checkGeneralStyles() {
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
