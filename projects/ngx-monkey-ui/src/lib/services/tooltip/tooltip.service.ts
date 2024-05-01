import { Injectable } from '@angular/core';
import { Tooltip } from './tooltip';
import { Subject } from 'rxjs';
import { MonkeyStyle } from '../../objects/enums/style.enum';

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

  /**
   * Represents the event subject for tooltips.
   */
  event: Subject<Tooltip> = new Subject<Tooltip>();

  /**
   * Shows a tooltip with the specified text, style, and mouse position.
   * @param text - The text to display in the tooltip.
   * @param style - The style of the tooltip.
   * @param mousePosition - The position of the mouse when the tooltip is shown.
   */
  onShow(text: string, style: MonkeyStyle, mousePosition: { x: number, y: number } = { x: 0, y: 0 }) {
    if (this.showTimeoutId) {
      this.removeTimeouts();
    }

    this.showTimeoutId = setTimeout(() => {
      this.show(new Tooltip(style, text, mousePosition));
    }, this.DEFAULT_TIME_BEFORE_SHOW);
  }

  /**
   * Shows the specified tooltip.
   * 
   * @param tooltip - The tooltip to be shown.
   */
  show(tooltip: Tooltip) {
    this.event.next(tooltip);
    this.removeTimeouts();
  }

  /**
   * Hides the tooltip after a certain delay.
   */
  private onHide() {
    this.hideTimeoutId = setTimeout(() => {
      this.hide();
    }, this.DEFAULT_SCREEN_TIME);
  }

  /**
   * Hides the tooltip and finish pending tooltips.
   */
  hide() {
    this.event.next(new Tooltip(MonkeyStyle.NONE, '', undefined));
    this.removeTimeouts();
  }

  /**
   * Clears the timeouts for showing and hiding the tooltip.
   */
  private removeTimeouts() {
    clearTimeout(this.showTimeoutId);
    clearTimeout(this.hideTimeoutId);
  }
}
