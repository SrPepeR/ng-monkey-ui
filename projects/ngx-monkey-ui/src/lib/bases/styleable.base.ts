import { Component, Input, OnChanges, OnInit } from "@angular/core";

import { ThemeService } from "../services/theme.service";
import { ComponentsStylesService } from "../services/components-styles.service";

@Component({
	selector: '',
	template: '',
	providers: [
		ThemeService,
		ComponentsStylesService,
	],
})
export class Styleable implements OnInit, OnChanges {

	private themeService: ThemeService = new ThemeService();
	private componentStylesService: ComponentsStylesService = new ComponentsStylesService();

	// STYLE
	@Input() style: string = 'primary';

	// COMPONENTS TYPES
	@Input() brutalist?: string = 'true';
	@Input() flat?: string = 'true';
	@Input() ghost?: string = 'true';
	@Input() glass?: string = 'true';
	@Input() glow?: string = 'true';

	// GENERAL STYLES
	@Input() alignLeft?: string = 'false';
	@Input() alignCenter?: string = 'false';
	@Input() alignRight?: string = 'false';

	isDarkMode$ = this.themeService.isDarkMode$;

	classList: Array<string> = [];

	ngOnInit() {
		this.addAllClasses();
	}

	ngOnChanges() {
		this.addAllClasses();
	}

	private addAllClasses() {
		this.classList = this.componentStylesService.generateClassList(this);
		this.checkGeneralStyles();
		this.addAditionalClasses();
	}

	private checkGeneralStyles() {
		if (!this.check(this.alignLeft) && !this.check(this.alignRight)) {
			this.alignCenter = '';
		}
	}

	protected addAditionalClasses() { }

	protected check(value: any) {
		return value === '';
	}

}
