import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ComponentsSizesService {

  constructor() { }

  generateClassList(component: any) {
    let classList: Array<string> = component.classList || [];
    let componentType = 'size-sm';

    // Adds the component size class
    if (component.xs === '') {
      componentType = 'size-xs';
    }

    if (component.sm === '') {
      componentType = 'size-sm';
    }

    if (component.md === '') {
      componentType = 'size-md';
    }

    if (component.lg === '') {
      componentType = 'size-lg';
    }

    if (component.xl === '') {
      componentType = 'size-xl';
    }

    classList.push(componentType);

    return classList;
  }

}
