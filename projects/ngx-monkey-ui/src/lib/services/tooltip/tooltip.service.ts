import { Injectable } from '@angular/core';
import { Tooltip } from './tooltip';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TooltipService {

  /**
   * Default screen time for the tooltip to be shown.
   */
  private DEFAULT_SCREEN_TIME: number = 300;

  hideTimeoutId: any;

  event: Subject<Tooltip> = new Subject<Tooltip>();

  show(text: string, style: string, mousePosition: { x: number, y: number } = { x: 0, y: 0 }) {
    this.event.next(new Tooltip(style, text, mousePosition));
    this.removeHideTimeout();
  }

  private onHide() {
    this.hideTimeoutId = setTimeout(() => {
      this.hide();
    }, this.DEFAULT_SCREEN_TIME);
  }

  hide() {
    this.event.next(new Tooltip('', '', undefined));
    this.removeHideTimeout();
  }

  private removeHideTimeout() {
    clearTimeout(this.hideTimeoutId);
  }
}
