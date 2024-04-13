import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ComponentsStylesService {

  constructor() { }

  generateClassList(component: any) {
    let classList: Array<string> = [];
    
    // Adds the component color scheme class to the classList array
    if (component.style) {
      classList.push(`style-${component.style}`);
    }
    
    classList = classList.concat(this.checkTypes(classList, component));

    classList = classList.concat(this.checkGeneralStyles(classList, component));

    if (this.check(component.contrast)) {
      classList.push('contrast');
    }

    return classList;
  }

  private checkTypes(classList: Array<string>, component: any): Array<string> {
    let componentType = 'type-default';

    if (this.check(component.brutalist)) {
      componentType = 'type-brutalist';
    }

    if (this.check(component.flat)) {
      componentType = 'type-flat';
    }

    if (this.check(component.ghost)) {
      componentType = 'type-ghost';
    }

    if (this.check(component.glass)) {
      componentType = 'type-glassmorphism';
    }

    if (this.check(component.glow)) {
      componentType = 'type-glow';
    }

    classList.push(componentType);

    return classList;
  }

  private checkGeneralStyles(classList: Array<string>, component: any): Array<string> {
    if (this.check(component.displayFlexWrapReverse)) {
      classList.push('display-flex-wrap-reverse');
    }

    if (this.check(component.noPadding)) {
      classList.push('no-padding');
    }

    if (this.check(component.noMargin)) {
      classList.push('no-margin');
    }

    if (this.check(component.squared)) {
      classList.push('squared-item');
    }

    if (this.check(component.fullRounded)) {
      classList.push('full-rounded');
    }

    if (this.check(component.alignLeft)) {
      classList.push('align-left');
    }

    if (this.check(component.alignCenter)) {
      classList.push('align-center');
    }

    if (this.check(component.alignRight)) {
      classList.push('align-right');
    }

    return classList;
  }

  private check(value: any) {
    return value === '';
  }

}
