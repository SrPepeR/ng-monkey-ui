import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { DropdownOption, MonkeyAlertService, MonkeyButtonData, MonkeyFontService, MonkeyInputNumberType, MonkeyInputTextType, MonkeyStyle } from 'ngx-monkey-ui';
import { map } from 'rxjs';

@Component({
  selector: 'app-components-portfolio',
  templateUrl: './components-portfolio.component.html',
  styleUrls: ['./components-portfolio.component.scss']
})
export class ComponentsPortfolioComponent {

  componentsTypes: MonkeyButtonData[] = [
    new MonkeyButtonData(MonkeyStyle.PRIMARY, 'Default', () => this.setType('Default'), 'star', 'left'),
    new MonkeyButtonData(MonkeyStyle.SECONDARY, 'Brutalist', () => this.setType('Brutalist'), 'gavel', 'left'),
    new MonkeyButtonData(MonkeyStyle.TERTIARY, 'Glass', () => this.setType('Glass'), 'wine_bar', 'left'),
    new MonkeyButtonData(MonkeyStyle.TERTIARY, 'Flat', () => this.setType('Flat'), 'tools_flat_head', 'right'),
    new MonkeyButtonData(MonkeyStyle.SECONDARY, 'Ghost', () => this.setType('Ghost'), 'partly_cloudy_night', 'right'),
    new MonkeyButtonData(MonkeyStyle.PRIMARY, 'Glow', () => this.setType('Glow'), 'stylus_laser_pointer', 'right'),
  ];

  dropdownOptions: DropdownOption[] = [
    { label: 'Success alert', icon: 'done', value: 'success' },
    { label: 'Warning alert', icon: 'warning', value: 'warning' },
    { label: 'Danger alert', icon: 'dangerous', value: 'danger' },
    { label: 'Info alert', icon: 'info', value: 'info' },
  ];

  carouselData: { src: string, title?: string, alt?: string, action?: Function }[] = [
    {
      src: 'https://via.placeholder.com/150',
      title: 'First image',
      alt: 'First image alt',
    },
    {
      src: 'https://via.placeholder.com/300',
      title: 'Second image',
      alt: 'Second image alt'
    },
    {
      src: 'https://via.placeholder.com/500',
      title: 'Third image',
      alt: 'Third image alt'
    },
    {
      src: 'https://via.placeholder.com/700',
      title: 'Fourth image',
      alt: 'Fourth image alt'
    }
  ];

  currentType: string = 'Default';

  currentStyle: MonkeyStyle = MonkeyStyle.PRIMARY;

  warningStyle: MonkeyStyle = MonkeyStyle.WARNING;
  successStyle: MonkeyStyle = MonkeyStyle.SUCCESS;
  infoStyle: MonkeyStyle = MonkeyStyle.INFO;

  offSwitchText: string = 'Off';
  onSwitchText: string = 'On';

  contentHeaderAction: MonkeyButtonData = new MonkeyButtonData(this.currentStyle, 'Show alert', () => this.showAlert('Content header'), 'info', 'right');

  form: FormGroup = new FormGroup({
    monkeyInputText: new FormControl('', [Validators.minLength(3), Validators.maxLength(10)]),
    emailMonkeyInputText: new FormControl('', [Validators.email, Validators.minLength(3)]),
    passwordMonkeyInputText: new FormControl('', [Validators.required, Validators.minLength(6), Validators.maxLength(10)]),
    numberMonkeyInputNumber: new FormControl('', [Validators.min(0), Validators.max(100)]),
  });

  monkeyInputTextTypeText: MonkeyInputTextType = MonkeyInputTextType.TEXT;
  monkeyInputTextTypeEmail: MonkeyInputTextType = MonkeyInputTextType.EMAIL;
  monkeyInputTextTypePassword: MonkeyInputTextType = MonkeyInputTextType.PASSWORD;
  monkeyInputTextTypeUrl: MonkeyInputTextType = MonkeyInputTextType.URL;
  monkeyInputTextTypeSearch: MonkeyInputTextType = MonkeyInputTextType.SEARCH;
  monkeyInputTextTypeMonth: MonkeyInputTextType = MonkeyInputTextType.MONTH;
  monkeyInputTextTypeWeek: MonkeyInputTextType = MonkeyInputTextType.WEEK;

  monkeyInputNumberTypeNumber: MonkeyInputNumberType = MonkeyInputNumberType.NUMBER;
  monkeyInputNumberTypePhone: MonkeyInputNumberType = MonkeyInputNumberType.PHONE;
  monkeyInputNumberTypeDate: MonkeyInputNumberType = MonkeyInputNumberType.DATE;
  monkeyInputNumberTypeDatetime: MonkeyInputNumberType = MonkeyInputNumberType.DATETIME;
  monkeyInputNumberTypeTime: MonkeyInputNumberType = MonkeyInputNumberType.TIME;

  INPUT_TEXT_FORM_CONTROL_NAME: string = 'monkeyInputText';
  EMAIL_INPUT_TEXT_FORM_CONTROL_NAME: string = 'emailMonkeyInputText';
  PASSWORD_INPUT_TEXT_FORM_CONTROL_NAME: string = 'passwordMonkeyInputText';

  NUMBER_INPUT_NUMBER_FORM_CONTROL_NAME: string = 'numberMonkeyInputNumber';

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

  setType(newType: string): void {
    this.currentType = newType;
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

  showAlert(text: string): void {
    this.alertService.successes([`${text}`], true, 'Success');
  }

  onSelectedChanged(DropdownOption: DropdownOption): void {
    switch (DropdownOption.value) {
      case 'success':
        this.alertService.successes(['Selected option: ' + DropdownOption.label], true, 'Success');
        break;
      case 'warning':
        this.alertService.warnings(['Selected option: ' + DropdownOption.label], true, 'Warning');
        break;
      case 'danger':
        this.alertService.dangers(['Selected option: ' + DropdownOption.label], true, 'Danger');
        break;
      case 'info':
        this.alertService.infos(['Selected option: ' + DropdownOption.label], true, 'Info');
        break;
      default:
        this.alertService.customs(['Selected option: ' + DropdownOption.label], MonkeyStyle.PRIMARY, true, 'Primary', 'looks_one');
        break;
    }
  }

  submitForm(): void {
    this.alertService.successes(['Formulario válido.', 'Datos enviados:', JSON.stringify(this.form.value)], true, 'Success');
  }

  resetForm(): void {
    this.form.reset();
  }

  carouselAction(index: number): void {
    this.alertService.infos(['Carousel image ' + index + ' clicked.'], true, 'Info');
  }
}
