export class IconsProvidersFamily {

  family: string;

  constructor(family: string) {
    this.family = family;
  }

}

export class IconProvider {
  
  href: string;
  name: string;
  className: string;
  iconsProviderFamily: IconsProvidersFamily;

  constructor(href: string, name: string, className: string, iconsProviderFamily: IconsProvidersFamily) {
    this.href = href;
    this.name = name;
    this.className = className;
    this.iconsProviderFamily = iconsProviderFamily;
  }

}

export class IconsProviders {

  // GOOGLE ICONS FAMILY
  static GOOGLE_FAMILY: IconsProvidersFamily = new IconsProvidersFamily('GOOGLE');

  static GOOGLE_NEW_OUTLINE: IconProvider = new IconProvider(
    'https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined',
    'Google new Icons Outline',
    'material-symbols-outlined',
    this.GOOGLE_FAMILY
  );

  static GOOGLE_NEW_ROUNDED: IconProvider = new IconProvider(
    'https://fonts.googleapis.com/css2?family=Material+Symbols+Rounded',
    'Google new Icons Rounded',
    'material-symbols-rounded',
    this.GOOGLE_FAMILY
  );

  static GOOGLE_NEW_SHARP: IconProvider = new IconProvider(
    'https://fonts.googleapis.com/css2?family=Material+Symbols+Sharp',
    'Google new Icons Sharp',
    'material-symbols-sharp',
    this.GOOGLE_FAMILY
  );

  static GOOGLE_OUTLINE: IconProvider = new IconProvider(
    'https://fonts.googleapis.com/css2?family=Material+Icons+Outlined',
    'Google Icons Outline',
    'material-icons-outlined',
    this.GOOGLE_FAMILY
  );

  static GOOGLE_ROUNDED: IconProvider = new IconProvider(
    'https://fonts.googleapis.com/css2?family=Material+Icons+Rounded',
    'Google Icons Rounded',
    'material-icons-rounded',
    this.GOOGLE_FAMILY
  );

  static GOOGLE_SHARP: IconProvider = new IconProvider(
    'https://fonts.googleapis.com/css2?family=Material+Icons+Sharp',
    'Google Icons Sharp',
    'material-icons-sharp',
    this.GOOGLE_FAMILY
  );

  // TODO ADD MORE ICONS PROVIDERS

}
