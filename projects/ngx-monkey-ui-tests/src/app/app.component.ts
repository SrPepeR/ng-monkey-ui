import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DropdownOption, MenuOption, MonkeyAlertService, MonkeyFontService, MonkeyScreenService, MonkeyStyle } from 'ngx-monkey-ui';
import { ScreenOrientation } from 'projects/ngx-monkey-ui/src/lib/services/screen/screen.enum';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  
  currentStyle: MonkeyStyle = MonkeyStyle.PRIMARY;

  title = 'ngx-monkey-ui-tests';

  menuRoutes: MenuOption[] = [];

  fontOptions: DropdownOption[] = [
    { label: 'Dosis', value: '1' },
    { label: 'Titillium Web', value: '2' },
    { label: 'Red Hat Display', value: '3' },
  ];

  screenOptions: DropdownOption[] = [
    { label: 'Toggle fullscreen', icon: 'fullscreen', value: 'toggle-fullscreen' },
    { label: 'Lock rotation', icon: 'screen_lock_rotation', value: 'locked' },
    { label: 'Unlock rotation', icon: 'screen_rotation', value: 'unlocked' },
    { label: 'Portrait', icon: 'screen_lock_portrait', value: 'portrait' },
    { label: 'Landscape', icon: 'screen_lock_landscape', value: 'landscape' },
  ];

  styleOptions: MenuOption[] = [
    { label: 'Primary', icon: 'palette', route: 'primary' },
    { label: 'Secondary', icon: 'palette', route: 'secondary' },
    { label: 'Tertiary', icon: 'palette', route: 'tertiary' },
    { label: 'Warning', icon: 'palette', route: 'warning' },
    { label: 'Danger', icon: 'palette', route: 'danger' },
    { label: 'Success', icon: 'palette', route: 'success' },
    { label: 'Info', icon: 'palette', route: 'info' },
  ];

  constructor(
    private alertService: MonkeyAlertService,
    private fontService: MonkeyFontService,
    private screenService: MonkeyScreenService,
    private router: Router,
  ) {
    this.fontService.addDosisFont();
    this.setStyle();
  }

  ngOnInit() {
    this.generateRoutes();
  }

  private generateRoutes() {
    const homeRoute = `/home/${this.currentStyle}`;
    const componentsRoute = `/components/${this.currentStyle}`;

    this.menuRoutes = [
      { label: 'Example', icon: 'info', route: homeRoute },
      { label: 'Comnponents', icon: 'info', route: componentsRoute },
    ];
  }

  // Theme settings
  themeChanged(): void {
    this.alertService.infos(['Tema cambiado.'], true, 'Info');
  }

  // Style settings
  changeStyle(newStyle: MenuOption): void {
    this.setStyle(newStyle.route);
    this.generateRoutes();
    this.router.navigate([this.router.url.split('/')[1], newStyle.route]);
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

  // Font settings
  changeFont(newFont: DropdownOption) {
    switch (newFont.value) {
      case '1':
        this.fontService.addDosisFont();
        break;
      case '2':
        this.fontService.addTitilliumWebFont();
        break;
      case '3':
        this.fontService.addRedHatDisplayFont();
        break;
    }
  }

  // Screen settings
  applyScreenSetting(screenSetting: DropdownOption) {
    this.applyScreenModifier(screenSetting.value);
  }

  private applyScreenModifier(option: string): void {
    switch (option) {
      case 'toggle-fullscreen':
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
