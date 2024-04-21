import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Message } from '../components/third-level/alert/message';

@Injectable({ providedIn: 'root' })
export class MonkeyAlertService {

  /**
   * Default screen time for the alert to be shown.
   */
  private DEFAULT_SCREEN_TIME: number = 5000;

  hideTimeoutId: any;

  event: Subject<Message> = new Subject<Message>();

  /**
   * Displays a warning alert with the given text.
   * @param text The text to be displayed in the alert.
   * @param isAutoClose Determines whether the alert should automatically close after being displayed.
   * @param title Optional title for the alert.
   */
  warning(text: string, isAutoClose: boolean, title?: string) {
    this.warnings([text], isAutoClose, title);
  }

  /**
   * Displays multiple warning alerts with the given texts.
   * @param texts An array of texts to be displayed in the alerts.
   * @param isAutoClose Determines whether the alerts should automatically close after being displayed.
   * @param title Optional title for the alerts.
   */
  warnings(texts: string[], isAutoClose: boolean, title?: string) {
    this.event.next(new Message(texts, 'warning', isAutoClose, title, 'warning'));
    this.removeHideTimeout();

    if (isAutoClose) {
      this.onHide();
    }
  }

  /**
   * Displays a danger alert with the given text.
   * @param text The text to be displayed in the alert.
   * @param isAutoClose Determines whether the alert should automatically close after being displayed.
   * @param title Optional title for the alert.
   */
  danger(text: string, isAutoClose: boolean, title?: string) {
    this.dangers([text], isAutoClose, title);
  }

  /**
   * Displays multiple danger alerts with the given texts.
   * @param texts An array of texts to be displayed in the alerts.
   * @param isAutoClose Determines whether the alerts should automatically close after being displayed.
   * @param title Optional title for the alerts.
   */
  dangers(texts: string[], isAutoClose: boolean, title?: string) {
    this.event.next(new Message(texts, 'danger', isAutoClose, title, 'dangerous'));
    this.removeHideTimeout();

    if (isAutoClose) {
      this.onHide();
    }
  }

  /**
   * Displays a success alert with the given text.
   * @param text The text to be displayed in the alert.
   * @param isAutoClose Determines whether the alert should automatically close after being displayed.
   * @param title Optional title for the alert.
   */
  success(text: string, isAutoClose: boolean, title?: string) {
    this.successes([text], isAutoClose, title);
  }

  /**
   * Displays multiple success alerts with the given texts.
   * @param texts An array of texts to be displayed in the alerts.
   * @param isAutoClose Determines whether the alerts should automatically close after being displayed.
   * @param title Optional title for the alerts.
   */
  successes(texts: string[], isAutoClose: boolean, title?: string) {
    this.event.next(new Message(texts, 'success', isAutoClose, title, 'done'));
    this.removeHideTimeout();

    if (isAutoClose) {
      this.onHide();
    }
  }

  /**
   * Displays an info alert with the given text.
   * @param text The text to be displayed in the alert.
   * @param isAutoClose Determines whether the alert should automatically close after being displayed.
   * @param title Optional title for the alert.
   */
  info(text: string, isAutoClose: boolean, title?: string) {
    this.infos([text], isAutoClose, title);
  }

  /**
   * Displays multiple info alerts with the given texts.
   * @param texts An array of texts to be displayed in the alerts.
   * @param isAutoClose Determines whether the alerts should automatically close after being displayed.
   * @param title Optional title for the alerts.
   */
  infos(texts: string[], isAutoClose: boolean, title?: string) {
    this.event.next(new Message(texts, 'info', isAutoClose, title, 'info'));
    this.removeHideTimeout();

    if (isAutoClose) {
      this.onHide();
    }
  }

  /**
   * Displays a custom alert with the given text, style, and icon.
   * @param text The text to be displayed in the alert.
   * @param style The style of the alert.
   * @param isAutoClose Determines whether the alert should automatically close after being displayed.
   * @param title Optional title for the alert.
   * @param icon Optional icon for the alert.
   */
  custom(text: string, style: string, isAutoClose: boolean, title?: string, icon?: string) {
    this.customs([text], style, isAutoClose, title, icon);
  }

  /**
   * Displays multiple custom alerts with the given texts, style, and icon.
   * @param texts An array of texts to be displayed in the alerts.
   * @param style The style of the alerts.
   * @param isAutoClose Determines whether the alerts should automatically close after being displayed.
   * @param title Optional title for the alerts.
   * @param icon Optional icon for the alerts.
   */
  customs(texts: string[], style: string, isAutoClose: boolean, title?: string, icon?: string) {
    this.event.next(new Message(texts, style, isAutoClose, title, icon));
    this.removeHideTimeout();

    if (isAutoClose) {
      this.onHide();
    }
  }

  private onHide() {
    this.hideTimeoutId = setTimeout(() => {
      this.hide();
    }, this.DEFAULT_SCREEN_TIME);
  }

  /**
   * Hides the alert.
   */
  hide() {
    this.event.next(new Message([], 'alert', true));
    this.removeHideTimeout();
  }

  private removeHideTimeout() {
    clearTimeout(this.hideTimeoutId);
  }

}
