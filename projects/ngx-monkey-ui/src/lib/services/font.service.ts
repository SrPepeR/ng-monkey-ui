import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MonkeyFontService {

  private DOSIS_FONT_NAME = 'Dosis';
  private DOSIS_FONT_URL = 'https://fonts.googleapis.com/css2?family=Dosis:wght@200..800&display=swap';
  
  private TITILLIUM_WEB_FONT_NAME = 'Titillium Web';
  private TITILLIUM_WEB_FONT_URL = 'https://fonts.googleapis.com/css2?family=Titillium+Web:ital,wght@0,200;0,300;0,400;0,600;0,700;0,900;1,200;1,300;1,400;1,600;1,700&display=swap';
  
  private RED_HAT_DISPLAY_FONT_NAME = 'Red Hat Display';
  private RED_HAT_DISPLAY_FONT_URL = 'https://fonts.googleapis.com/css2?family=Red+Hat+Display:ital,wght@0,300..900;1,300..900';

  constructor() {
    this.initGoogleFonts();
    this.addDosisFont();
  }

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

  addDosisFont() {
    this.addCustomFont(this.DOSIS_FONT_URL, this.DOSIS_FONT_NAME, true);
  }

  removeDosisFont() {
    this.removeCustomFont(this.DOSIS_FONT_URL);
  }

  addTitilliumWebFont() {
    this.addCustomFont(this.TITILLIUM_WEB_FONT_URL, this.TITILLIUM_WEB_FONT_NAME, true);
  }

  removeTitilliumWebFont() {
    this.removeCustomFont(this.TITILLIUM_WEB_FONT_URL);
  }

  addRedHatDisplayFont() {
    this.addCustomFont(this.RED_HAT_DISPLAY_FONT_URL, this.RED_HAT_DISPLAY_FONT_NAME, true);
  }

  removeRedHatDisplayFont() {
    this.removeCustomFont(this.RED_HAT_DISPLAY_FONT_URL);
  }

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

  useCustomFont(fontName: string) {
    const style = document.createElement('style');
    style.innerHTML = `* { font-family: '${fontName}'}`;
    style.id = `monkey-font-${this.parseFontName(fontName)}`;
    document.head.appendChild(style);
  }

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

  private parseFontName(fontName: string): string {
    return fontName.replace(/ /g, '-');
  }

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
