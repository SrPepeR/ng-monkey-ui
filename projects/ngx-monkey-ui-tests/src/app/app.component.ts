import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MenuOption, MonkeyAlertService, MonkeyBackgroundService, MonkeyFontService, MonkeyScreenService, MonkeyStyle, ScreenOrientation } from 'ngx-monkey-ui';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  currentStyle: MonkeyStyle = MonkeyStyle.PRIMARY;

  title = 'ngx-monkey-ui-tests';

  menuRoutes: MenuOption[] = [];

  fontOptions: MenuOption[] = [
    {
      label: 'Fonts', icon: 'font_download', children: [
        { label: 'Dosis', icon: 'brand_family', route: 'font-dosis' },
        { label: 'Titillium Web', icon: 'brand_family', route: 'font-titillium' },
        { label: 'Red Hat Display', icon: 'brand_family', route: 'font-red' },
      ]
    },
  ];

  singleUselessOption: MenuOption[] = [
    { label: 'Useless', icon: 'info', route: 'useless' },
  ];

  styleOptions: MenuOption[] = [
    {
      label: 'Styles', icon: 'style', children: [
        { label: 'Primary color', icon: 'looks_one', route: 'style-primary' },
        { label: 'Secondary color', icon: 'looks_two', route: 'style-secondary' },
        { label: 'Tertiary color', icon: 'looks_3', route: 'style-tertiary' },
        { label: 'Warning color', icon: 'warning', route: 'style-warning' },
        { label: 'Danger color', icon: 'dangerous', route: 'style-danger' },
        { label: 'Success color', icon: 'done', route: 'style-success' },
        { label: 'Info color', icon: 'info', route: 'style-info' },
      ]
    },
  ];

  screenOptions: MenuOption[] = [
    {
      label: 'Screen', icon: 'fit_screen', children: [
        { label: 'Toggle fullscreen', icon: 'fullscreen', route: 'screen-toggleFullscreen' },
        { label: 'Lock rotation', icon: 'screen_lock_rotation', route: 'screen-locked' },
        { label: 'Unlock rotation', icon: 'screen_rotation', route: 'screen-unlocked' },
        { label: 'Portrait', icon: 'screen_lock_portrait', route: 'screen-portrait' },
        { label: 'Landscape', icon: 'screen_lock_landscape', route: 'screen-landscape' },
      ]
    },
  ];

  asideOptions: MenuOption[] = [
    ...this.fontOptions,
    ...this.singleUselessOption,
    ...this.styleOptions,
    ...this.screenOptions,
  ];

  constructor(
    private alertService: MonkeyAlertService,
    private fontService: MonkeyFontService,
    private screenService: MonkeyScreenService,
    private backgroundService: MonkeyBackgroundService,
    private router: Router,
  ) {
    this.fontService.addDosisFont();
    this.setStyle();
    this.backgroundService.setBaseColor('#2e99b1')
      .addGradient('hsl(162.15, 79%, 49%)', 30, { x: 47, y: 33 })
      .addGradient('hsl(166.53, 72%, 60%)', 55, { x: 82, y: 65 })
      .addGradient('hsl(168.74, 20%, 48%)', 33, { x: 33, y: 59 })
      .apply()
      .animate();
  }

  ngOnInit() {
    this.generateRoutes();
  }

  private generateRoutes() {
    const homeRoute = `/home/${this.currentStyle}`;
    const componentsRoute = `/components/${this.currentStyle}`;

    this.menuRoutes = [
      { label: 'Example', icon: 'info', route: homeRoute },
      { label: 'Components', icon: 'info', route: componentsRoute },
    ];
  }

  asideSelected(option: MenuOption) {
    const optionType = option.route!.split('-')[0];

    switch (optionType) {
      case 'font':
        this.changeFont(option.route!.split('-')[1]);
        break;
      case 'style':
        this.changeStyle(option.route!.split('-')[1]);
        break;
      case 'screen':
        this.applyScreenSetting(option.route!.split('-')[1]);
        break;
    }
  }

  // Theme settings
  themeChanged(): void {
    this.alertService.infos(['Tema cambiado.'], true, 'Info');
  }

  // Font settings
  changeFont(newFont: string) {
    switch (newFont) {
      case 'dosis':
        this.fontService.addDosisFont();
        break;
      case 'titillium':
        this.fontService.addTitilliumWebFont();
        break;
      case 'red':
        this.fontService.addRedHatDisplayFont();
        break;
    }
  }

  // Style settings
  private changeStyle(newStyle: string): void {
    this.setStyle(newStyle);
    this.generateRoutes();
    this.router.navigate([this.router.url.split('/')[1], newStyle]);
  }

  private setStyle(style?: string): void {
    switch (style) {
      case 'secondary':
        this.currentStyle = MonkeyStyle.SECONDARY;
        break;
      case 'tertiary':
        this.currentStyle = MonkeyStyle.TERTIARY;
        break;
      case 'warning':
        this.currentStyle = MonkeyStyle.WARNING;
        break;
      case 'danger':
        this.currentStyle = MonkeyStyle.DANGER;
        break;
      case 'success':
        this.currentStyle = MonkeyStyle.SUCCESS;
        break;
      case 'info':
        this.currentStyle = MonkeyStyle.INFO;
        break;
      default:
        this.currentStyle = MonkeyStyle.PRIMARY;
        break;
    }
  }

  // Screen settings
  applyScreenSetting(screenSetting: string) {
    this.applyScreenModifier(screenSetting);
  }

  private applyScreenModifier(option: string): void {
    switch (option) {
      case 'toggleFullscreen':
        this.screenService.toggleFullScreen();
        break;
      case 'locked':
        this.screenService.lockOrientation()
          .catch((error) => {
            this.alertService.dangers([error], true, 'Error');
          });
        break;
      case 'unlocked':
        this.screenService.unlockOrientation()
          .catch((error) => {
            this.alertService.dangers([error], true, 'Error');
          });
        break;
      case 'portrait':
        this.screenService.lockOrientation(ScreenOrientation.PORTRAIT)
          .catch((error) => {
            this.alertService.dangers([error], true, 'Error');
          });
        break;
      case 'landscape':
        this.screenService.lockOrientation(ScreenOrientation.LANDSCAPE)
          .catch((error) => {
            this.alertService.dangers([error], true, 'Error');
          });
        break;
    }
  }

}
