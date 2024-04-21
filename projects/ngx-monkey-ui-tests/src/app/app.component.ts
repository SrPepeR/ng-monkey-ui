import { Component } from '@angular/core';
import { DropdownOption, MenuOption, MonkeyAlertService, MonkeyFontService, MonkeyScreenService } from 'ngx-monkey-ui';
import { ScreenOrientation } from 'projects/ngx-monkey-ui/src/lib/services/screen/screen.enum';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  primaryStyle: Style = Style.primary;
  secondaryStyle: Style = Style.secondary;
  tertiaryStyle: Style = Style.tertiary;
  warningStyle: Style = Style.warning;
  dangerStyle: Style = Style.danger;
  successStyle: Style = Style.success;
  infoStyle: Style = Style.info;

  title = 'ngx-monkey-ui-tests';
  currentStyle: Style = this.primaryStyle;

  offSwitchText: string = 'Off';
  onSwitchText: string = 'On';

  dropdownOptions: DropdownOption[] = [
    { label: 'Dosis', value: '1' },
    { label: 'Titillium Web', value: '2' },
    { label: 'Red Hat Display', value: '3' },
  ];

  menuOptions: MenuOption[] = [
    { label: 'Option 1', icon: 'info', route: '/option1' },
    { label: 'Option 2', icon: 'info', route: '/option2' },
    {
      label: 'Rotations', children: [
        { label: 'Toggle full screen', icon: 'fullscreen', route: '/toggle-fullscreen' },
        { label: 'Locked', icon: 'screen_lock_rotation', route: '/locked' },
        { label: 'Unlocked', icon: 'screen_rotation', route: '/unlocked' },
        { label: 'portrait', icon: 'screen_lock_portrait', route: '/portrait' },
        { label: 'landscape', icon: 'screen_lock_landscape', route: '/landscape' },
      ]
    },
  ];

  constructor(
    private alertService: MonkeyAlertService,
    private fontService: MonkeyFontService,
    private screenService: MonkeyScreenService,
  ) {
    this.fontService.addDosisFont();
  }

  changeStyle(newStyle: Style): void {
    this.currentStyle = newStyle;
  }

  onNavigated(option: MenuOption) {
    if (!this.checkSelectedRouteScreenModifier(option)) {
      this.alertService.infos(['Navigating to ' + option.label + '.'], true, 'Info');
      return;
    }

    this.applyScreenModifier(option);
  }

  private checkSelectedRouteScreenModifier(option: MenuOption): boolean {
    let isScreenModifierOption = false;
    this.menuOptions.forEach((menuOption: MenuOption) => {
      if (menuOption.children) {
        menuOption.children.forEach((childMenuOption: MenuOption) => {
          if (childMenuOption.route === option.route) {
            isScreenModifierOption = true;
          }
        });
      }
    });

    return isScreenModifierOption;
  }

  private applyScreenModifier(option: MenuOption): void {
    switch (option.route) {
      case '/toggle-fullscreen':
        this.screenService.toggleFullScreen();
        break;
      case '/locked':
        this.screenService.lockOrientation()
          .catch((error) => {
            this.alertService.dangers([error], true, 'Error');
          });
        break;
      case '/unlocked':
        this.screenService.unlockOrientation()
          .catch((error) => {
            this.alertService.dangers([error], true, 'Error');
          });
        break;
      case '/portrait':
        this.screenService.lockOrientation(ScreenOrientation.PORTRAIT)
          .catch((error) => {
            this.alertService.dangers([error], true, 'Error');
          });
        break;
      case '/landscape':
        this.screenService.lockOrientation(ScreenOrientation.LANDSCAPE)
          .catch((error) => {
            this.alertService.dangers([error], true, 'Error');
          });
        break;
    }
  }

  themeChanged(): void {
    this.alertService.infos(['Tema cambiado.'], true, 'Info');
  }

  onClicked(fromButton: string): void {
    this.alertService.warnings(['Botón ' + fromButton + ' presionado.'], true, 'Warning');
  }

  onSwitch(fromSwitch: string, checked: Boolean): void {
    this.alertService.dangers(['Switch ' + fromSwitch + '.', checked ? 'ACTIVADO' : 'DESACTIVADO'], true, 'Danger');
  }

  onCheck(fromCheckbox: string, checked: Boolean): void {
    this.alertService.successes(['CheckBox ' + fromCheckbox + '.', checked ? 'ACTIVADO' : 'DESACTIVADO'], true, 'Success');
  }

  onDropdownChanged(option: DropdownOption) {
    switch (option.value) {
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

}

enum Style {
  primary = 'primary',
  secondary = 'secondary',
  tertiary = 'tertiary',

  warning = 'warning',
  danger = 'danger',
  success = 'success',
  info = 'info',
}
