/**
 * Represents a focus utility class that manages the focus behavior of an element.
 */
export class Focus {

  /**
   * The currently focused element.
   */
  focusedElement?: HTMLElement;

  /**
   * Determines whether the element has unfocused opacity.
   */
  unfocusedOpacity: boolean = false;

  constructor(focusedElement?: HTMLElement, unfocusedOpacity?: boolean) {
    this.focusedElement = focusedElement;
    this.unfocusedOpacity = unfocusedOpacity || false;
  }

}
