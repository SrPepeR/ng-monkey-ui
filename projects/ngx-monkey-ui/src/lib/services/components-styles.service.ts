import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ComponentsStylesService {

  constructor() { }

  generateClassList(component: any) {
    let classList: Array<string> = [];
    let componentType = 'type-default';
    
    // Adds the component color scheme class to the classList array
    if (component.style) {
      classList.push(`style-${component.style}`);
    }

    if (component.brutalist === '') {
      componentType = 'type-brutalist';
    }

    if (component.flat === '') {
      componentType = 'type-flat';
    }

    if (component.ghost === '') {
      componentType = 'type-ghost';
    }

    if (component.glass === '') {
      componentType = 'type-glassmorphism';
    }

    if (component.glow === '') {
      componentType = 'type-glow';
    }

    classList.push(componentType);

    return classList;
  }

}
