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

  changeStyle(newStyle: Style): void {
    this.currentStyle =newStyle;
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
