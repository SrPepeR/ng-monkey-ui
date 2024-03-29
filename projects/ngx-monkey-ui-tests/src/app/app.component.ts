import { Component } from '@angular/core';

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

  themeChanged(): void {
    console.log('themeChanged');
  }

  changeStyle(newStyle: Style): void {
    this.currentStyle =newStyle;
  }

  onClicked(fromButton: string): void {
    console.log('onClicked', fromButton);
  }

  onSwitch(fromSwitch: string, checked: Boolean): void {
    console.log('onSwitch', fromSwitch, checked);
  }

  onCheck(fromCheckbox: string, checked: Boolean): void {
    console.log('onCheck', fromCheckbox, checked);
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
