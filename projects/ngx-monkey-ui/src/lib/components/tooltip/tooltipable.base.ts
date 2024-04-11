import { Component, Input, OnDestroy } from "@angular/core";
import { TooltipService } from "../../services/tooltip/tooltip.service";

@Component({
	selector: 'app-tooltip-base',
	template: '',
})
export class Tooltipable implements OnDestroy {

	@Input() alt?: string = '';
	@Input() style?: any;

	constructor(protected tooltipService: TooltipService) { }

	showTooltip(event: MouseEvent) {
		if (!this.alt) {
			return;
		}

		this.tooltipService.show(this.alt, this.style, { x: event.pageX, y: event.pageY });
	}

	hideTooltip() {
		this.tooltipService.hide();
	}

	ngOnDestroy() {
		this.tooltipService.hide();
	}

}
