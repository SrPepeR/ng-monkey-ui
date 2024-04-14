import { Component, Input, OnChanges, OnInit } from "@angular/core";

import { ComponentsStylesService } from "../services/components-styles.service";
import { Observable, fromEvent, map, startWith } from "rxjs";

@Component({
	selector: '',
	template: '',
	providers: [
		ComponentsStylesService,
	],
})
export class Styleable implements OnInit, OnChanges {

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
	@Input() sticky?: string = 'false';

	screenWidth$: Observable<number>;
	screenWidth: number = 0;
	screenWidthStyle: string = 'screen-xs';

	classList: Array<string> = [];

	constructor() {
		this.screenWidth$ = fromEvent(window, 'resize').pipe(
			startWith(0),
			map(() => window.innerWidth)
		);
	}

	ngOnInit() {
		this.addAllClasses();

		this.screenWidth$.subscribe((value: number) => {
			this.checkScreenSize(value);
		});
	}

	ngOnChanges() {
		this.addAllClasses();

		this.screenWidth$.subscribe((value: number) => {
			this.checkScreenSize(value);
		});
	}

	private checkScreenSize(value: number) {
		this.screenWidth = value;

		if (value < 600) {
			this.screenWidthStyle = 'screen-xs';
		} else if (value < 768) {
			this.screenWidthStyle = 'screen-sm';
		} else if (value < 992) {
			this.screenWidthStyle = 'screen-md';
		} else if (value < 1200) {
			this.screenWidthStyle = 'screen-lg';
		} else {
			this.screenWidthStyle = 'screen-xl';
		}

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

		if (this.check(this.sticky)) {
			this.classList.push('position-sticky');
		}
	}

	protected addAditionalClasses() {
		this.classList.push(this.screenWidthStyle);
	}

	protected check(value: any) {
		return value === '';
	}

}
