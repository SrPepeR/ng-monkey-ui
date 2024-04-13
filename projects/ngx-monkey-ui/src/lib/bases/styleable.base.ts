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
	@Input() style: 'background' | 'primary' | 'secondary' | 'tertiary' | 'success' | 'warning' | 'danger' | 'info' | '' = 'primary';

	// COMPONENTS TYPES
	@Input() brutalist?: string = 'false';
	@Input() flat?: string = 'false';
	@Input() ghost?: string = 'false';
	@Input() glass?: string = 'false';
	@Input() glow?: string = 'false';

	// GENERAL STYLES
	@Input() flexStart?: string = 'false';
	@Input() flexCenter?: string = 'false';
	@Input() flexEnd?: string = 'false';

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
		if (this.check(this.flexStart)) {
			this.classList.push('flex-start');
		}

		if (this.check(this.flexCenter)) {
			this.classList.push('flex-center');
		}

		if (this.check(this.flexEnd)) {
			this.classList.push('flex-end');
		}
	}

	protected addAditionalClasses() { }

	protected check(value: any) {
		return value === '';
	}

}
