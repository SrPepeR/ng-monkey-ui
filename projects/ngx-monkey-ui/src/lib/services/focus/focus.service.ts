import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Focus } from './focus';

@Injectable({
  providedIn: 'root'
})
export class MonkeyFocusService {

  /**
   * Represents the reference of the unfocused component in the DOM.
   */
  private UNFOCUSED_COMPONENT_REFERENCE = 'monkey-unfocus';

  /**
   * Represents a subject that emits focus events.
   */
  event: Subject<Focus> = new Subject<Focus>();

  /**
   * Sets the focus on the specified element.
   *
   * @param focus - The element to focus on.
   */
  focus(focus: Focus) {
    this.event.next(focus);
  }

  /**
   * Removes the current focus from the specified element.
   */
  unfocus() {
    this.event.next(new Focus());
  }

}
