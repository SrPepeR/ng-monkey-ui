import { Component, Input, OnChanges, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { ThemeService } from '../../../services/theme.service';

@Component({
  selector: 'monkey-scrollbar',
  templateUrl: './scrollbar.component.html',
  styleUrls: [
    '../../../styles/components/_common.default.style.scss',
    './scrollbar.component.scss',
  ],
})
export class MonkeyScrollbar implements OnInit, OnChanges, OnDestroy {
  // Lights
  @Input() backgroundLight = 'rgba(251, 251, 251, 0.8)';

  @Input() thumbLight = '#40d2ec';

  @Input() thumbHoverLight = '#2bb6d8';

  // Darks
  @Input() backgroundDark = 'rgba(18, 18, 18, 0.8)';

  @Input() thumbDark = '#ff1493';

  @Input() thumbHoverDark = '#ff69b4';

  /**
   * Observable that indicates whether the dark mode is enabled.
   */
  isDarkMode$ = this.themeService.isDarkMode$;

  /**
   * The `<style>` element of this scrollbar, reused on every change.
   */
  private styleElement?: HTMLStyleElement;

  /**
   * Whether the dark theme is active, to rebuild the styles when an input changes.
   */
  private darkMode = false;

  /**
   * Subscription to the theme changes.
   */
  private themeSubscription?: Subscription;

  constructor(private themeService: ThemeService) {}

  /**
   * Starts following the theme once the inputs are set.
   */
  ngOnInit() {
    this.themeSubscription = this.isDarkMode$.subscribe((darkMode) => {
      this.darkMode = darkMode;
      this.addScrollbarStyleStyle(darkMode);
    });
  }

  /**
   * Rebuilds the styles when a color input changes after the first render.
   */
  ngOnChanges() {
    if (this.styleElement) {
      this.addScrollbarStyleStyle(this.darkMode);
    }
  }

  /**
   * Stops following the theme and removes the styles of this scrollbar.
   */
  ngOnDestroy() {
    this.themeSubscription?.unsubscribe();
    this.styleElement?.remove();
    this.styleElement = undefined;
  }

  /**
   * Adds the scrollbar style to the document head.
   * @param darkMode - A boolean indicating whether the dark mode is enabled or not. Default is false.
   */
  private addScrollbarStyleStyle(darkMode = false) {
    if (!this.styleElement) {
      this.styleElement = document.createElement('style');
      document.head.appendChild(this.styleElement);
    }

    this.styleElement.textContent = `
      ::-webkit-scrollbar {
        width: 6px;
      }

      ::-webkit-scrollbar-track {
        background: ${darkMode ? this.backgroundDark : this.backgroundLight};
      }

      ::-webkit-scrollbar-thumb {
        background: ${darkMode ? this.thumbDark : this.thumbLight};
        cursor: pointer;
      }

      ::-webkit-scrollbar-thumb:hover {
        background: ${darkMode ? this.thumbHoverDark : this.thumbHoverLight};
      }
    `;
  }
}
