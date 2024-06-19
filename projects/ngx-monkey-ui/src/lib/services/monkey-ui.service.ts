import { Injectable } from '@angular/core';
import {MonkeyFontService} from "./fonts-icons/font.service";
import {MonkeyBackgroundService} from "./background/background.service";

@Injectable({
  providedIn: 'root'
})
export class MonkeyUI {

  constructor(
    private fontService: MonkeyFontService,
    private backgroundService: MonkeyBackgroundService,
  ) {}

  /**
   * Initializes a new project with the default theme.
   * Adds the default font and background color.
   */
  start() {
    this.backgroundService
      .setBaseColor('#2e99b1')
      .apply();
  }

}
