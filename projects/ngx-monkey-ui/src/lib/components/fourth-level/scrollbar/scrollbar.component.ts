import { Component, Input } from '@angular/core';
import { ThemeService } from '../../../services/theme.service';

@Component({
  selector: 'monkey-scrollbar',
  templateUrl: './scrollbar.component.html',
  styleUrls: [
    '../../../styles/components/_common.default.style.scss',
    './scrollbar.component.scss',
  ]
})
export class MonkeyScrollbar {

  // Lights
  @Input() backgroundLight: string = 'rgba(251, 251, 251, 0.8)';

  @Input() thumbLight: string = '#40d2ec';

  @Input() thumbHoverLight: string = '#2bb6d8';

  // Darks
  @Input() backgroundDark: string = 'rgba(18, 18, 18, 0.8)';

  @Input() thumbDark: string = '#ff1493';

  @Input() thumbHoverDark: string = '#ff69b4';

  /**
   * Observable that indicates whether the dark mode is enabled.
   */
  isDarkMode$ = this.themeService.isDarkMode$;

  constructor(
    private themeService: ThemeService,
  ) {
    this.isDarkMode$.subscribe(darkMode => {
      this.addScrollbarStyleStyle(darkMode);
    });
  }

  /**
   * Adds the scrollbar style to the document head.
   * @param darkMode - A boolean indicating whether the dark mode is enabled or not. Default is false.
   */
  private addScrollbarStyleStyle(darkMode: boolean = false) {
    const style = document.createElement('style');

    style.innerHTML = `
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
    document.head.appendChild(style);
  }

}
