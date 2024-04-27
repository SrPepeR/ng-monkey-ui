import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MonkeyAlertService, MonkeyFontService, MonkeyStyle } from 'ngx-monkey-ui';
import { MonkeyButtonData } from 'projects/ngx-monkey-ui/src/lib/objects/classes/button-data.class';
import { map } from 'rxjs';

@Component({
  selector: 'app-components-portfolio',
  templateUrl: './components-portfolio.component.html',
  styleUrls: ['./components-portfolio.component.scss']
})
export class ComponentsPortfolioComponent {
  
  currentStyle: MonkeyStyle = MonkeyStyle.PRIMARY;

  offSwitchText: string = 'Off';
  onSwitchText: string = 'On';

  buttonsGroupData: MonkeyButtonData[] = [
    new MonkeyButtonData(MonkeyStyle.PRIMARY, 'First', () => this.onClicked('First'), 'info', 'left'),
    new MonkeyButtonData(MonkeyStyle.SECONDARY, 'Second', () => this.onClicked('Second')),
    new MonkeyButtonData(MonkeyStyle.TERTIARY, 'Third', () => this.onClicked('Third'), 'info', 'right'),
  ];

  constructor(
    private alertService: MonkeyAlertService,
    private fontService: MonkeyFontService,
    private route: ActivatedRoute,
  ) {
    this.manageParams();
    this.fontService.addDosisFont();
  }

  private manageParams(): void {
    this.route.paramMap.pipe(
      map(params => {
        this.setStyle(params.get('style') ?? undefined);
      })).subscribe();
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

  changeStyle(newStyle: MonkeyStyle): void {
    this.currentStyle = newStyle;
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

}
