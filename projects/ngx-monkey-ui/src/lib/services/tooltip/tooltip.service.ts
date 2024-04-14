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

  /**
   * Default time before show tooltip on screen.
   */
  private DEFAULT_TIME_BEFORE_SHOW: number = 2000;

  showTimeoutId: any;
  hideTimeoutId: any;

  event: Subject<Tooltip> = new Subject<Tooltip>();

  onShow(text: string, style: string, mousePosition: { x: number, y: number } = { x: 0, y: 0 }) {
    if (this.showTimeoutId) {
      this.removeTimeouts();
    }

    this.showTimeoutId = setTimeout(() => {
      this.show(new Tooltip(style, text, mousePosition));
    }, this.DEFAULT_TIME_BEFORE_SHOW);
  }

  show(tooltip: Tooltip) {
    this.event.next(tooltip);
    this.removeTimeouts();
  }

  private onHide() {
    this.hideTimeoutId = setTimeout(() => {
      this.hide();
    }, this.DEFAULT_SCREEN_TIME);
  }

  hide() {
    this.event.next(new Tooltip('', '', undefined));
    this.removeTimeouts();
  }

  private removeTimeouts() {
    clearTimeout(this.showTimeoutId);
    clearTimeout(this.hideTimeoutId);
  }
}
