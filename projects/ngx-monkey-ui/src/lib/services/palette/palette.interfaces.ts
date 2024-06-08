import {SchemesEnum, ColorsEnum} from "./palette.enums";

export interface Color {
  color: ColorsEnum;

  main: string;

  lowContrast: string;
  highContrast: string;

  lowOpacity: string;
  mediumOpacity: string;
  highOpacity: string;

  emphasis: string;
}

export interface Scheme {
  scheme: SchemesEnum;

  background: Color;
  primary: Color;
  secondary: Color;
  tertiary: Color;
  warning: Color;
  success: Color;
  danger: Color;
  info: Color;
}

export interface Palette {
  light: Scheme;
  dark: Scheme;
}
