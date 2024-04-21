import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MonkeyFontService {

  /**
   * The name of the Dosis font.
   */
  private DOSIS_FONT_NAME = 'Dosis';

  /**
   * The URL of the Dosis font.
   */
  private DOSIS_FONT_URL = 'https://fonts.googleapis.com/css2?family=Dosis:wght@200..800&display=swap';

  /**
   * The name of the Titillium Web font.
   */
  private TITILLIUM_WEB_FONT_NAME = 'Titillium Web';

  /**
   * The URL of the Titillium Web font.
   */
  private TITILLIUM_WEB_FONT_URL = 'https://fonts.googleapis.com/css2?family=Titillium+Web:ital,wght@0,200;0,300;0,400;0,600;0,700;0,900;1,200;1,300;1,400;1,600;1,700&display=swap';

  /**
   * The name of the Red Hat Display font.
   */
  private RED_HAT_DISPLAY_FONT_NAME = 'Red Hat Display';

  /**
   * The URL of the Red Hat Display font.
   */
  private RED_HAT_DISPLAY_FONT_URL = 'https://fonts.googleapis.com/css2?family=Red+Hat+Display:ital,wght@0,300..900;1,300..900';

  constructor() {
    this.initGoogleFonts();
    this.addDosisFont();
  }

  /**
   * Initializes the preconnect links for Google Fonts.
   */
  private initGoogleFonts() {
    const preconnect = document.createElement('link');
    preconnect.rel = 'preconnect';
    preconnect.href = 'https://fonts.googleapis.com';
    document.head.appendChild(preconnect);

    const preconnect2 = document.createElement('link');
    preconnect2.rel = 'preconnect';
    preconnect2.href = 'https://fonts.gstatic.com';
    preconnect2.crossOrigin = 'true';
    document.head.appendChild(preconnect2);
  }

  /**
   * Adds the Dosis font to the document.
   */
  addDosisFont() {
    this.addCustomFont(this.DOSIS_FONT_URL, this.DOSIS_FONT_NAME, true);
  }

  /**
   * Removes the Dosis font from the document.
   */
  removeDosisFont() {
    this.removeCustomFont(this.DOSIS_FONT_URL);
  }

  /**
   * Adds the Titillium Web font to the document.
   */
  addTitilliumWebFont() {
    this.addCustomFont(this.TITILLIUM_WEB_FONT_URL, this.TITILLIUM_WEB_FONT_NAME, true);
  }

  /**
   * Removes the Titillium Web font from the document.
   */
  removeTitilliumWebFont() {
    this.removeCustomFont(this.TITILLIUM_WEB_FONT_URL);
  }

  /**
   * Adds the Red Hat Display font to the document.
   */
  addRedHatDisplayFont() {
    this.addCustomFont(this.RED_HAT_DISPLAY_FONT_URL, this.RED_HAT_DISPLAY_FONT_NAME, true);
  }

  /**
   * Removes the Red Hat Display font from the document.
   */
  removeRedHatDisplayFont() {
    this.removeCustomFont(this.RED_HAT_DISPLAY_FONT_URL);
  }

  /**
   * Adds a custom font to the document.
   * @param fontUrl The URL of the font.
   * @param fontName The name of the font.
   * @param useFont Whether to use the font as the default font.
   */
  addCustomFont(fontUrl: string, fontName: string, useFont = false) {
    const link = document.createElement('link');
    link.href = fontUrl;
    link.id = `monkey-font-${this.parseFontName(fontName)}`;
    link.rel = 'stylesheet';
    document.head.appendChild(link);

    if (useFont) {
      this.removeOtherFonts(this.parseFontName(fontName));
      this.useCustomFont(fontName!);
    }
  }

  /**
   * Sets a custom font as the default font.
   * @param fontName The name of the font.
   */
  useCustomFont(fontName: string) {
    const style = document.createElement('style');
    style.innerHTML = `* { font-family: '${fontName}'}`;
    style.id = `monkey-font-${this.parseFontName(fontName)}`;
    document.head.appendChild(style);
  }

  /**
   * Removes a custom font from the document.
   * @param fontUrl The URL of the font.
   * @param fontName The name of the font.
   */
  removeCustomFont(fontUrl: string, fontName?: string) {
    const link = document.querySelector(`link[href="${fontUrl}"]`);
    if (link) {
      link.remove();

      const style = document.querySelector(`style[id="monkey-font-${fontName}"]`);
      if (style) {
        style.remove();
      }
    }
  }

  /**
   * Parses the font name to replace spaces with hyphens.
   * @param fontName The name of the font.
   * @returns The parsed font name.
   */
  private parseFontName(fontName: string): string {
    return fontName.replace(/ /g, '-');
  }

  /**
   * Removes other custom fonts from the document.
   * @param fontNameId The ID of the font name.
   */
  private removeOtherFonts(fontNameId: string) {
    const links = document.querySelectorAll('link');
    links.forEach(link => {
      if (link.href.includes(`monkey-font-`) && !link.href.includes(`monkey-font-${fontNameId}`)) {
        link.remove();
      }
    });

    const styles = document.querySelectorAll('style');
    styles.forEach(style => {
      if (style.id.includes(`monkey-font-`) && !style.id.includes(`monkey-font-${fontNameId}`)) {
        style.remove();
      }
    });
  }
  
}
