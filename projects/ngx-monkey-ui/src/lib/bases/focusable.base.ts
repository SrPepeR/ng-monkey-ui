import { Component, OnDestroy } from "@angular/core";
import { MonkeyFocusService } from "../services/focus/focus.service";
import { Focus } from "../services/focus/focus";

/**
 * Base class for components that can be focused.
 */
@Component({
	selector: 'app-focusable-base',
	template: '',
})
export class Focusable implements OnDestroy {

	constructor(protected focusService: MonkeyFocusService) { }

	/**
	 * Sets the focus on the specified element.
	 * 
	 * @param element - The element to focus on.
	 * @param opacity - Determines whether the element has unfocused opacity.
	 */
	focusElement(element?: HTMLElement, opacity?: boolean) {
		this.focusService.focus(new Focus(element, opacity));
	}

	/**
	 * Removes the focus.
	 */
	unfocusElement() {
		this.focusService.unfocus();
	}

	/**
	 * Cleans up resources when the component is destroyed.
	 */
	ngOnDestroy() {
		this.focusService.unfocus();
	}

}
