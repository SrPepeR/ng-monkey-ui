import { Component } from '@angular/core';
import { DropdownOption, MenuOption, MonkeyAlertService, MonkeyFontService } from 'ngx-monkey-ui';

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
      label: 'Dropdown', children: [
        { label: 'Option 1', icon: 'home', route: '/option1' },
        { label: 'Option 2', route: '/option2' },
        { label: 'Option 3', icon: 'info', route: '/option3' },
      ]
    },
  ];

  constructor(
    private alertService: MonkeyAlertService,
    private fontService: MonkeyFontService,
  ) {
    this.fontService.addDosisFont();
  }

  changeStyle(newStyle: Style): void {
    this.currentStyle = newStyle;
  }

  onNavigated(option: MenuOption) {
    this.alertService.infos(['Navigating to ' + option.label + '.'], true, 'Info');
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
