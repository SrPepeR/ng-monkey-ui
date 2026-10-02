import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class MonkeyFontService {
  /**
   * The name of the Dosis font.
   */
  private DOSIS_FONT_NAME = 'Dosis';

  /**
   * The URL of the Dosis font.
   */
  private DOSIS_FONT_URL =
    'https://fonts.googleapis.com/css2?family=Dosis:wght@200..800&display=swap';

  /**
   * The name of the Titillium Web font.
   */
  private TITILLIUM_WEB_FONT_NAME = 'Titillium Web';

  /**
   * The URL of the Titillium Web font.
   */
  private TITILLIUM_WEB_FONT_URL =
    'https://fonts.googleapis.com/css2?family=Titillium+Web:ital,wght@0,200;0,300;0,400;0,600;0,700;0,900;1,200;1,300;1,400;1,600;1,700&display=swap';

  /**
   * The name of the Red Hat Display font.
   */
  private RED_HAT_DISPLAY_FONT_NAME = 'Red Hat Display';

  /**
   * The URL of the Red Hat Display font.
   */
  private RED_HAT_DISPLAY_FONT_URL =
    'https://fonts.googleapis.com/css2?family=Red+Hat+Display:ital,wght@0,300..900;1,300..900&display=swap';

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
    this.removeCustomFont(this.DOSIS_FONT_URL, this.DOSIS_FONT_NAME);
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
    this.removeCustomFont(this.TITILLIUM_WEB_FONT_URL, this.TITILLIUM_WEB_FONT_NAME);
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
    this.removeCustomFont(this.RED_HAT_DISPLAY_FONT_URL, this.RED_HAT_DISPLAY_FONT_NAME);
  }

  /**
   * Adds a custom font to the document.
   * @param fontUrl The URL of the font.
   * @param fontName The name of the font.
   * @param useFont Whether to use the font as the default font.
   */
  addCustomFont(fontUrl: string, fontName: string, useFont = false) {
    if (!this.findLink(fontUrl)) {
      const link = document.createElement('link');
      link.href = fontUrl;
      link.id = this.linkId(fontName);
      link.rel = 'stylesheet';
      document.head.appendChild(link);
    }

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
    document.getElementById(this.styleId(fontName))?.remove();

    const style = document.createElement('style');
    style.innerHTML = `* { font-family: '${fontName}'}`;
    style.id = this.styleId(fontName);
    document.head.appendChild(style);
  }

  /**
   * Removes a custom font from the document.
   * @param fontUrl The URL of the font.
   * @param fontName The name of the font.
   */
  removeCustomFont(fontUrl: string, fontName?: string) {
    this.findLink(fontUrl)?.remove();

    if (fontName) {
      document.getElementById(this.styleId(fontName))?.remove();
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
    const keptIds = [this.linkId(fontNameId), this.styleId(fontNameId)];

    document.head
      .querySelectorAll('link[id^="monkey-font-"], style[id^="monkey-font-"]')
      .forEach((element) => {
        if (!keptIds.includes(element.id)) {
          element.remove();
        }
      });
  }

  /**
   * Finds the `<link>` of a font by its URL.
   * @param fontUrl The URL of the font.
   * @returns The `<link>`, or `undefined` when the font is not added.
   */
  private findLink(fontUrl: string): HTMLLinkElement | undefined {
    return Array.from(document.head.querySelectorAll('link')).find(
      (link) => link.getAttribute('href') === fontUrl,
    );
  }

  /**
   * Id of the `<link>` that loads a font.
   * @param fontName The name of the font.
   */
  private linkId(fontName: string): string {
    return `monkey-font-${this.parseFontName(fontName)}-link`;
  }

  /**
   * Id of the `<style>` that uses a font.
   * @param fontName The name of the font.
   */
  private styleId(fontName: string): string {
    return `monkey-font-${this.parseFontName(fontName)}`;
  }
}
