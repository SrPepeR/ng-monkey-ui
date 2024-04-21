import { Component, Input, OnDestroy } from "@angular/core";
import { TooltipService } from "../services/tooltip/tooltip.service";

/**
 * Base class for components that can display tooltips.
 */
@Component({
	selector: 'app-tooltip-base',
	template: '',
})
export class Tooltipable implements OnDestroy {

	/**
	 * The alternative text for the tooltip.
	 */
	@Input() alt?: string = '';

	/**
	 * The style of the tooltip.
	 * Possible values: 'background', 'primary', 'secondary', 'tertiary', 'success', 'warning', 'danger', 'info', or an empty string.
	 * Default value: 'primary'.
	 */
	@Input() style: 'background' | 'primary' | 'secondary' | 'tertiary' | 'success' | 'warning' | 'danger' | 'info' | '' = 'primary';

	constructor(protected tooltipService: TooltipService) { }

	/**
	 * Displays the tooltip at the specified mouse event coordinates.
	 * @param event - The mouse event that triggered the tooltip display.
	 */
	showTooltip(event: MouseEvent) {
		if (!this.alt) {
			return;
		}

		this.tooltipService.onShow(this.alt, this.style, { x: event.pageX, y: event.pageY });
	}

	/**
	 * Hides the tooltip.
	 */
	hideTooltip() {
		this.tooltipService.hide();
	}

	/**
	 * Cleans up resources when the component is destroyed.
	 */
	ngOnDestroy() {
		this.tooltipService.hide();
	}

}
