import { Component } from '@angular/core';
import { DropdownOption, MonkeyAlertService } from 'ngx-monkey-ui';

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
    { label: 'Option 1', icon:'home', value: 'option1' },
    { label: 'Option 2', value: 'option2' },
    { label: 'Option 3', icon:'info', value: 'option3' },
  ];

  constructor(
    private alertService: MonkeyAlertService,
  ) { }

  changeStyle(newStyle: Style): void {
    this.currentStyle = newStyle;
  }

  themeChanged(): void {
    this.alertService.infos(['Tema cambiado.'], true, 'Info');
  }

  onClicked(fromButton: string): void {
    this.alertService.warnings(['Botón ' + fromButton + ' presionado.'], false, 'Warning');
  }

  onSwitch(fromSwitch: string, checked: Boolean): void {
    this.alertService.dangers(['Switch ' + fromSwitch + '.', checked? 'ACTIVADO': 'DESACTIVADO'], true, 'Danger');
  }

  onCheck(fromCheckbox: string, checked: Boolean): void {
    this.alertService.successes(['CheckBox ' + fromCheckbox + '.', checked? 'ACTIVADO': 'DESACTIVADO'], false, 'Success');
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
