import { Injectable } from '@angular/core';

/**
  * Generates a class list based on the component's size properties.
  * @param component - The component object.
  * @returns An array of strings representing the class list.
  */
@Injectable({
  providedIn: 'root'
})
export class ComponentsSizesService {

  constructor() { }

  /**
   * Generates a class list based on the provided component's size properties.
   * @param component - The component object.
   * @returns An array of strings representing the class list.
   */
  generateClassList(component: any) {
    let classList: Array<string> = component.classList || [];
    let componentType!: string;

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

    if (componentType) {
      classList.push(componentType);
    }

    return classList;
  }

}
