import {Palette} from "./palette.interfaces";
import {ColorsEnum, SchemesEnum} from "./palette.enums";

/**
 * The default palette of the library.
 */
export const DEFAULT_PALETTE: Palette = {
  light: {
    scheme: SchemesEnum.LIGHT,
    background: {
      color: ColorsEnum.BACKGROUND,

      main: '#fbfbfb',

      lowContrast: '#b8b8b8',
      highContrast: '#011222',

      lowOpacity: 'rgba(251, 251, 251, 0.1)',
      mediumOpacity: 'rgba(251, 251, 251, 0.2)',
      highOpacity: 'rgba(251, 251, 251, 0.8)',

      emphasis: '#f5f5f5',
    },
    primary: {
      color: ColorsEnum.PRIMARY,

      main: '#40d2ec',

      lowContrast: '#fbfbfb',
      highContrast: '#011222',

      lowOpacity: 'rgba(64, 210, 236, 0.1)',
      mediumOpacity: 'rgba(64, 210, 236, 0.2)',
      highOpacity: 'rgba(64, 210, 236, 0.8)',

      emphasis: '#2bb6d8',
    },
    secondary: {
      color: ColorsEnum.SECONDARY,
      main: '#967adc',
      lowContrast: '#fbfbfb',
      highContrast: '#011222',
      lowOpacity: 'rgba(150, 122, 220, 0.1)',
      mediumOpacity: 'rgba(150, 122, 220, 0.2)',
      highOpacity: 'rgba(150, 122, 220, 0.8)',
      emphasis: '#7b63b4',
    },
    tertiary: {
      color: ColorsEnum.TERTIARY,
      main: '#ff00ff',
      lowContrast: '#fbfbfb',
      highContrast: '#011222',
      lowOpacity: 'rgba(255, 0, 255, 0.1)',
      mediumOpacity: 'rgba(255, 0, 255, 0.2)',
      highOpacity: 'rgba(255, 0, 255, 0.8)',
      emphasis: '#cc00cc',
    },
    warning: {
      color: ColorsEnum.WARNING,
      main: '#ffcc00',
      lowContrast: '#f5f5f5',
      highContrast: '#0d0d0d',
      lowOpacity: 'rgba(255, 204, 0, 0.1)',
      mediumOpacity: 'rgba(255, 204, 0, 0.2)',
      highOpacity: 'rgba(255, 204, 0, 0.8)',
      emphasis: '#feca57',
    },
    success: {
      color: ColorsEnum.SUCCESS,
      main: '#32cd32',
      lowContrast: '#0d0d0d',
      highContrast: '#f5f5f5',
      lowOpacity: 'rgba(50, 205, 50, 0.1)',
      mediumOpacity: 'rgba(50, 205, 50, 0.2)',
      highOpacity: 'rgba(50, 205, 50, 0.8)',
      emphasis: '#2e8b57',
    },
    danger: {
      color: ColorsEnum.DANGER,
      main: '#dc3545',
      lowContrast: '#0d0d0d',
      highContrast: '#f5f5f5',
      lowOpacity: 'rgba(220, 53, 69, 0.1)',
      mediumOpacity: 'rgba(220, 53, 69, 0.2)',
      highOpacity: 'rgba(220, 53, 69, 0.8)',
      emphasis: '#c82333',
    },
    info: {
      color: ColorsEnum.INFO,
      main: '#17a2b8',
      lowContrast: '#0d0d0d',
      highContrast: '#f5f5f5',
      lowOpacity: 'rgba(23, 162, 184, 0.1)',
      mediumOpacity: 'rgba(23, 162, 184, 0.2)',
      highOpacity: 'rgba(23, 162, 184, 0.8)',
      emphasis: '#138496',
    }
  },
  dark: {
    scheme: SchemesEnum.DARK,
    background: {
      color: ColorsEnum.BACKGROUND,
      main: '#121212',
      lowContrast: '#b3b3b3',
      highContrast: '#f5f5f5',
      lowOpacity: 'rgba(18, 18, 18, 0.1)',
      mediumOpacity: 'rgba(18, 18, 18, 0.2)',
      highOpacity: 'rgba(18, 18, 18, 0.8)',
      emphasis: '#0d0d0d',
    },
    primary: {
      color: ColorsEnum.PRIMARY,
      main: '#ff1493',
      lowContrast: '#0d0d0d',
      highContrast: '#f5f5f5',
      lowOpacity: 'rgba(255, 20, 147, 0.1)',
      mediumOpacity: 'rgba(255, 20, 147, 0.2)',
      highOpacity: 'rgba(255, 20, 147, 0.8)',
      emphasis: '#ff69b4',
    },
    secondary: {
      color: ColorsEnum.SECONDARY,
      main: '#1e90ff',
      lowContrast: '#0d0d0d',
      highContrast: '#f5f5f5',
      lowOpacity: 'rgba(30, 144, 255, 0.1)',
      mediumOpacity: 'rgba(30, 144, 255, 0.2)',
      highOpacity: 'rgba(30, 144, 255, 0.8)',
      emphasis: '#1c86ee',
    },
    tertiary: {
      color: ColorsEnum.TERTIARY,
      main: '#8a2be2',
      lowContrast: '#0d0d0d',
      highContrast: '#f5f5f5',
      lowOpacity: 'rgba(138, 43, 226, 0.1)',
      mediumOpacity: 'rgba(138, 43, 226, 0.2)',
      highOpacity: 'rgba(138, 43, 226, 0.8)',
      emphasis: '#9932cc',
    },
    warning: {
      color: ColorsEnum.WARNING,
      main: '#ffcc00',
      lowContrast: '#f5f5f5',
      highContrast: '#0d0d0d',
      lowOpacity: 'rgba(255, 204, 0, 0.1)',
      mediumOpacity: 'rgba(255, 204, 0, 0.2)',
      highOpacity: 'rgba(255, 204, 0, 0.8)',
      emphasis: '#feca57',
    },
    success: {
      color: ColorsEnum.SUCCESS,
      main: '#32cd32',
      lowContrast: '#0d0d0d',
      highContrast: '#f5f5f5',
      lowOpacity: 'rgba(50, 205, 50, 0.1)',
      mediumOpacity: 'rgba(50, 205, 50, 0.2)',
      highOpacity: 'rgba(50, 205, 50, 0.8)',
      emphasis: '#2e8b57',
    },
    danger: {
      color: ColorsEnum.DANGER,
      main: '#dc3545',
      lowContrast: '#0d0d0d',
      highContrast: '#f5f5f5',
      lowOpacity: 'rgba(220, 53, 69, 0.1)',
      mediumOpacity: 'rgba(220, 53, 69, 0.2)',
      highOpacity: 'rgba(220, 53, 69, 0.8)',
      emphasis: '#c82333',
    },
    info: {
      color: ColorsEnum.INFO,
      main: '#17a2b8',
      lowContrast: '#0d0d0d',
      highContrast: '#f5f5f5',
      lowOpacity: 'rgba(23, 162, 184, 0.1)',
      mediumOpacity: 'rgba(23, 162, 184, 0.2)',
      highOpacity: 'rgba(23, 162, 184, 0.8)',
      emphasis: '#138496',
    }
  }
}
