import {Inject, Injectable} from '@angular/core';
import {DOCUMENT} from "@angular/common";
import {Color, Palette, Scheme} from "./palette.interfaces";
import {ColorsEnum, SchemesEnum} from "./palette.enums";
import {DEFAULT_PALETTE} from "./palette.default";

/**
 * MonkeyColorPaletteService is a service that provides methods to manage color palettes in an Angular application.
 * It allows setting a theme, color scheme, individual colors, and applying these settings to the application.
 */
@Injectable({
  providedIn: 'root'
})
export class MonkeyColorPaletteService {

  /**
   * The current palette that is being managed by the service.
   * It contains a light and a dark scheme.
   * The default palette is the DEFAULT_PALETTE.
   * @type {Palette}
   * @private
   */
  private currentPalette: Palette = DEFAULT_PALETTE;

  constructor(
    @Inject(DOCUMENT) private document: Document
  ) { }

  /**
   * Set the theme of the palette.
   * @param {Palette} palette The palette to set.
   * @returns {MonkeyColorPaletteService} The service itself.
   */
  setTheme(palette: Palette): MonkeyColorPaletteService {
    this.currentPalette.light = palette.light;
    this.currentPalette.dark = palette.dark;

    return this;
  }

  /**
   * Set the color scheme of the palette.
   * @param {Scheme} scheme The scheme to set.
   * @returns {MonkeyColorPaletteService} The service itself.
   */
  setColorScheme(scheme: Scheme): MonkeyColorPaletteService {
    switch (scheme.scheme) {
      case SchemesEnum.LIGHT:
        this.currentPalette.light = scheme;
        break;
      case SchemesEnum.DARK:
        this.currentPalette.dark = scheme;
        break;
    }

    return this;
  }

  /**
   * Set a color of the palette.
   * @param {Color} color The color to set.
   * @param {SchemesEnum} scheme The scheme to set the color.
   * @returns {MonkeyColorPaletteService} The service itself.
   */
  setColor(color: Color, scheme: SchemesEnum): MonkeyColorPaletteService {
    let currentScheme!: Scheme;

    switch (scheme) {
      case SchemesEnum.LIGHT:
        currentScheme = this.currentPalette.light;
        break;
      case SchemesEnum.DARK:
        currentScheme = this.currentPalette.dark;
        break;
    }

    switch (color.color) {
      case ColorsEnum.BACKGROUND:
        currentScheme.background = color;
        break;
      case ColorsEnum.PRIMARY:
        currentScheme.primary = color;
        break;
      case ColorsEnum.SECONDARY:
        currentScheme.secondary = color;
        break;
      case ColorsEnum.TERTIARY:
        currentScheme.tertiary = color;
        break;
      case ColorsEnum.WARNING:
        currentScheme.warning = color;
        break;
      case ColorsEnum.SUCCESS:
        currentScheme.success = color;
        break;
      case ColorsEnum.DANGER:
        currentScheme.danger = color;
        break;
      case ColorsEnum.INFO:
        currentScheme.info = color;
        break;
    }

    return this;
  }

  /**
   * Set the default palette.
   * @returns {MonkeyColorPaletteService} The service itself.
   */
  setDefault(): MonkeyColorPaletteService {
    this.currentPalette = DEFAULT_PALETTE;

    return this;
  }

  /**
   * Apply the current palette to the application.
   * @returns {MonkeyColorPaletteService} The service itself.
   */
  apply(): MonkeyColorPaletteService {
    const currentSchemes = document.getElementById('monkey-colors-schemes');
    let style;

    if (currentSchemes) {
      style = currentSchemes;
    } else {
      style = document.createElement('style');
      style.id = 'monkey-colors-schemes';
    }

    style.innerHTML = this.generateCss();
    document.head.appendChild(style);

    return this;
  }

  /**
   * Generate the CSS for the current palette.
   * @returns {string} The CSS string.
   * @private
   */
  private generateCss(): string {
    let css: string = '';

    css += `*:not(.dark-theme){`;
    css += this.generateSchemeCss(this.currentPalette.light);
    css += `}`;

    css += `*:not(.dark-theme){`;
    css += this.generateSchemeCss(this.currentPalette.light);
    css += `}`;

    return css
  }

  /**
   * Generate the CSS for a scheme.
   * @param {Scheme} scheme The scheme to generate the CSS.
   * @returns {string} The CSS string.
   * @private
   */
  private generateSchemeCss(scheme: Scheme): string {
    let css: string = '';

    css += this.generateColorCss(scheme.background);
    css += this.generateColorCss(scheme.primary);
    css += this.generateColorCss(scheme.secondary);
    css += this.generateColorCss(scheme.tertiary);
    css += this.generateColorCss(scheme.warning);
    css += this.generateColorCss(scheme.success);
    css += this.generateColorCss(scheme.danger);
    css += this.generateColorCss(scheme.info);

    return css;
  }

  /**
   * Generate the CSS for a color.
   * @param {Color} color The color to generate the CSS.
   * @returns {string} The CSS string.
   * @private
   */
  private generateColorCss(color: Color): string {
    let css: string = '';

    css += `--${color.color}-color: ${color.main} !important;`;
    css += `--${color.color}-color-contrast-low: ${color.lowContrast} !important;`;
    css += `--${color.color}-color-contrast-hight: ${color.highContrast} !important;`;
    css += `--${color.color}-color-opacity-low: ${color.lowOpacity} !important;`;
    css += `--${color.color}-color-opacity-medium: ${color.mediumOpacity} !important;`;
    css += `--${color.color}-color-opacity-hight: ${color.highOpacity} !important;`;
    css += `--${color.color}-color-emphasis: ${color.emphasis} !important;`;

    return css;
  }

}
