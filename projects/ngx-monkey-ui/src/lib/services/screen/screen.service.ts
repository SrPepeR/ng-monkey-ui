import { Injectable } from '@angular/core';
import { MonkeyScreen } from './screen';
import { ScreenOrientation } from './screen.enum';
import { Observable, fromEvent, map, startWith } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class MonkeyScreenService {
  /**
   * Service responsible for managing screen-related functionality.
   */

  /**
   * Observable that emits the new screen data when the screen changes.
   */
  screenChanges$: Observable<MonkeyScreen>;

  constructor() {
    this.screenChanges$ = fromEvent(window, 'resize').pipe(
      startWith(null),
      map(() => this.getCurrentScreen())
    );
  }

  /**
   * Returns the current screen data.
   * 
   * @returns The current screen data.
   */
  public getCurrentScreen(): MonkeyScreen {
    const constraints = this.getScreenConstraints();

    return new MonkeyScreen(constraints.width, constraints.height);
  }

  /**
   * Returns the screen size constraints.
   * 
   * @returns The screen size constraints.
   */
  public getScreenConstraints(): { width: number, height: number } {
    return {
      width: window.innerWidth,
      height: window.innerHeight
    };
  }

  /**
   * Toggles the fullscreen mode of the document.
   */
  public toggleFullScreen(): void {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen();
    } else {
      document.exitFullscreen();
    }
  }

  /**
   * Locks the screen orientation to the specified orientation.
   * If no orientation is provided, it locks the screen to the current orientation.
   * 
   * @param orientation - The desired screen orientation.
   * @returns A promise that resolves when the screen orientation is locked successfully.
   *          If the screen orientation API is not supported, the promise is rejected with an error message.
   */
  public lockOrientation(orientation?: ScreenOrientation): Promise<void> {
    if ('orientation' in screen) {
      if (!orientation) {
        orientation = this.getCurrentScreen().orientation;
      }

      // @ts-ignore: Unreachable code error
      return screen.orientation.lock(orientation);
    } else {
      return Promise.reject('Screen Orientation API not supported');
    }
  }

  /**
   * Unlocks the screen orientation.
   * 
   * @returns A promise that resolves when the screen orientation is unlocked.
   * @throws If the Screen Orientation API is not supported.
   */
  public unlockOrientation(): Promise<void> {
    if ('orientation' in screen) {
      // @ts-ignore: Unreachable code error
      return screen.orientation.unlock();
    } else {
      return Promise.reject('Screen Orientation API not supported');
    }
  }

}
