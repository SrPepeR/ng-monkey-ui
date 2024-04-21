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

  warning(text: string, isAutoClose: boolean, title?: string) {
    this.warnings([text], isAutoClose, title);
  }

  warnings(texts: string[], isAutoClose: boolean, title?: string) {
    this.event.next(new Message(texts, 'warning', isAutoClose, title, 'warning'));
    this.removeHideTimeout();

    if (isAutoClose) {
      this.onHide();
    }
  }

  danger(text: string, isAutoClose: boolean, title?: string) {
    this.dangers([text], isAutoClose, title);
  }

  dangers(texts: string[], isAutoClose: boolean, title?: string) {
    this.event.next(new Message(texts, 'danger', isAutoClose, title, 'dangerous'));
    this.removeHideTimeout();

    if (isAutoClose) {
      this.onHide();
    }
  }

  success(text: string, isAutoClose: boolean, title?: string) {
    this.successes([text], isAutoClose, title);
  }

  successes(texts: string[], isAutoClose: boolean, title?: string) {
    this.event.next(new Message(texts, 'success', isAutoClose, title, 'done'));
    this.removeHideTimeout();

    if (isAutoClose) {
      this.onHide();
    }
  }

  info(text: string, isAutoClose: boolean, title?: string) {
    this.infos([text], isAutoClose, title);
  }

  infos(texts: string[], isAutoClose: boolean, title?: string) {
    this.event.next(new Message(texts, 'info', isAutoClose, title, 'info'));
    this.removeHideTimeout();

    if (isAutoClose) {
      this.onHide();
    }
  }

  custom(text: string, style: string, isAutoClose: boolean, title?: string, icon?: string) {
    this.customs([text], style, isAutoClose, title, icon);
  }

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

  hide() {
    this.event.next(new Message([], 'alert', true));
    this.removeHideTimeout();
  }

  private removeHideTimeout() {
    clearTimeout(this.hideTimeoutId);
  }

}
