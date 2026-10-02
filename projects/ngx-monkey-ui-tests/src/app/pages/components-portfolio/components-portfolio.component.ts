import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import {
  DropdownOption,
  MonkeyAlertService,
  MonkeyButtonData,
  MonkeyFontService,
  MonkeyInputNumberType,
  MonkeyInputTextType,
  MonkeyStyle,
} from 'ngx-monkey-ui';
import { map } from 'rxjs';

/**
 * Visual variants that every `Styleable` component accepts.
 */
type Variant = 'Default' | 'Brutalist' | 'Glass' | 'Flat' | 'Ghost' | 'Glow';

/**
 * Size inputs shared by the loader and the content header.
 */
type Size = 'xs' | 'sm' | 'md' | 'lg' | 'xl';

/**
 * A form field of the forms section.
 */
interface FieldDemo {
  label: string;
  controlName: string;
  icon: string;
}

interface TextFieldDemo extends FieldDemo {
  type: MonkeyInputTextType;
}

interface NumberFieldDemo extends FieldDemo {
  type: MonkeyInputNumberType;
}

@Component({
  selector: 'app-components-portfolio',
  templateUrl: './components-portfolio.component.html',
  styleUrls: ['./components-portfolio.component.scss'],
})
export class ComponentsPortfolioComponent {
  readonly IMAGE_URL =
    'https://th.bing.com/th/id/OIP.6bDf-HbrDJFPfyRPJTYVZgHaG7?rs=1&pid=ImgDetMain';

  readonly BROKEN_IMAGE_URL = 'https://example.invalid/monkey.png';

  readonly variants: Variant[] = ['Default', 'Brutalist', 'Glass', 'Flat', 'Ghost', 'Glow'];

  readonly colors: MonkeyStyle[] = [
    MonkeyStyle.PRIMARY,
    MonkeyStyle.SECONDARY,
    MonkeyStyle.TERTIARY,
    MonkeyStyle.SUCCESS,
    MonkeyStyle.WARNING,
    MonkeyStyle.DANGER,
    MonkeyStyle.INFO,
  ];

  readonly sizes: Size[] = ['xs', 'sm', 'md', 'lg', 'xl'];

  readonly avatarSizes: Size[] = ['sm', 'md', 'lg'];

  readonly gapSizes: ('sm' | 'md' | 'lg')[] = ['sm', 'md', 'lg'];

  /**
   * Variant shown, or `All` to show every variant one under another.
   */
  currentVariant: Variant | 'All' = 'All';

  variantFilters: MonkeyButtonData[] = [
    new MonkeyButtonData(MonkeyStyle.INFO, 'All', () => this.setVariant('All'), 'apps', 'left'),
    new MonkeyButtonData(
      MonkeyStyle.PRIMARY,
      'Default',
      () => this.setVariant('Default'),
      'star',
      'left',
    ),
    new MonkeyButtonData(
      MonkeyStyle.SECONDARY,
      'Brutalist',
      () => this.setVariant('Brutalist'),
      'gavel',
      'left',
    ),
    new MonkeyButtonData(
      MonkeyStyle.TERTIARY,
      'Glass',
      () => this.setVariant('Glass'),
      'wine_bar',
      'left',
    ),
    new MonkeyButtonData(
      MonkeyStyle.TERTIARY,
      'Flat',
      () => this.setVariant('Flat'),
      'tools_flat_head',
      'right',
    ),
    new MonkeyButtonData(
      MonkeyStyle.SECONDARY,
      'Ghost',
      () => this.setVariant('Ghost'),
      'partly_cloudy_night',
      'right',
    ),
    new MonkeyButtonData(
      MonkeyStyle.PRIMARY,
      'Glow',
      () => this.setVariant('Glow'),
      'stylus_laser_pointer',
      'right',
    ),
  ];

  groupActions: MonkeyButtonData[] = [
    new MonkeyButtonData(MonkeyStyle.PRIMARY, 'Save', () => this.onClicked('Save'), 'save', 'left'),
    new MonkeyButtonData(
      MonkeyStyle.SECONDARY,
      'Share',
      () => this.onClicked('Share'),
      'share',
      'left',
    ),
    new MonkeyButtonData(
      MonkeyStyle.DANGER,
      'Delete',
      () => this.onClicked('Delete'),
      'delete',
      'right',
    ),
  ];

  dropdownOptions: DropdownOption[] = [
    { label: 'Success alert', icon: 'done', value: 'success' },
    { label: 'Warning alert', icon: 'warning', value: 'warning' },
    { label: 'Danger alert', icon: 'dangerous', value: 'danger' },
    { label: 'Info alert', icon: 'info', value: 'info' },
  ];

  currentStyle: MonkeyStyle = MonkeyStyle.PRIMARY;

  warningStyle: MonkeyStyle = MonkeyStyle.WARNING;
  successStyle: MonkeyStyle = MonkeyStyle.SUCCESS;
  dangerStyle: MonkeyStyle = MonkeyStyle.DANGER;
  infoStyle: MonkeyStyle = MonkeyStyle.INFO;

  contentHeaderAction: MonkeyButtonData = new MonkeyButtonData(
    MonkeyStyle.PRIMARY,
    'Show alert',
    () => this.showAlert('Content header'),
    'info',
    'right',
  );

  textFields: TextFieldDemo[] = [
    { label: 'Text', controlName: 'text', icon: 'draw', type: MonkeyInputTextType.TEXT },
    { label: 'Email', controlName: 'email', icon: 'email', type: MonkeyInputTextType.EMAIL },
    {
      label: 'Password',
      controlName: 'password',
      icon: 'password',
      type: MonkeyInputTextType.PASSWORD,
    },
    { label: 'URL', controlName: 'url', icon: 'link', type: MonkeyInputTextType.URL },
    { label: 'Search', controlName: 'search', icon: 'search', type: MonkeyInputTextType.SEARCH },
    {
      label: 'Month',
      controlName: 'month',
      icon: 'calendar_month',
      type: MonkeyInputTextType.MONTH,
    },
    { label: 'Week', controlName: 'week', icon: 'date_range', type: MonkeyInputTextType.WEEK },
  ];

  numberFields: NumberFieldDemo[] = [
    { label: 'Number', controlName: 'number', icon: 'numbers', type: MonkeyInputNumberType.NUMBER },
    { label: 'Phone', controlName: 'phone', icon: 'call', type: MonkeyInputNumberType.PHONE },
    { label: 'Date', controlName: 'date', icon: 'event', type: MonkeyInputNumberType.DATE },
    {
      label: 'Date and time',
      controlName: 'datetime',
      icon: 'schedule',
      type: MonkeyInputNumberType.DATETIME,
    },
    { label: 'Time', controlName: 'time', icon: 'alarm', type: MonkeyInputNumberType.TIME },
  ];

  form: FormGroup = new FormGroup({
    text: new FormControl('', [Validators.required, Validators.minLength(3)]),
    email: new FormControl('', [Validators.email]),
    password: new FormControl('', [Validators.minLength(6), Validators.maxLength(10)]),
    url: new FormControl('', [Validators.pattern(/^https?:\/\/.+/)]),
    search: new FormControl(''),
    month: new FormControl(''),
    week: new FormControl(''),
    number: new FormControl(null, [Validators.min(0), Validators.max(100)]),
    phone: new FormControl(''),
    date: new FormControl(''),
    datetime: new FormControl(''),
    time: new FormControl(''),
  });

  constructor(
    private alertService: MonkeyAlertService,
    private fontService: MonkeyFontService,
    private route: ActivatedRoute,
  ) {
    this.manageParams();
    this.fontService.addDosisFont();
  }

  /**
   * Variants to render, depending on the filter.
   */
  get visibleVariants(): Variant[] {
    return this.currentVariant === 'All' ? this.variants : [this.currentVariant];
  }

  /**
   * Value for a variant input (`brutalist`, `glass`...): present (`''`) only for its variant.
   */
  flag(variant: Variant, target: Variant): string {
    return variant === target ? '' : 'false';
  }

  /**
   * Value for a size input (`xs`, `sm`...): present (`''`) only for the chosen size.
   */
  sizeFlag(size: Size, target: Size): string {
    return size === target ? '' : target;
  }

  private manageParams(): void {
    this.route.paramMap
      .pipe(
        map((params) => {
          this.setStyle(params.get('style') ?? undefined);
        }),
      )
      .subscribe();
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

  setVariant(variant: Variant | 'All'): void {
    this.currentVariant = variant;
  }

  onClicked(fromButton: string): void {
    this.alertService.warnings(['Botón ' + fromButton + ' presionado.'], true, 'Warning');
  }

  onSwitch(fromSwitch: string, checked: boolean): void {
    this.alertService.dangers(
      ['Switch ' + fromSwitch + '.', checked ? 'ACTIVADO' : 'DESACTIVADO'],
      true,
      'Danger',
    );
  }

  onCheck(fromCheckbox: string, checked: boolean): void {
    this.alertService.successes(
      ['CheckBox ' + fromCheckbox + '.', checked ? 'ACTIVADO' : 'DESACTIVADO'],
      true,
      'Success',
    );
  }

  showAlert(text: string): void {
    this.alertService.successes([`${text}`], true, 'Success');
  }

  showAlertOf(type: 'success' | 'warning' | 'danger' | 'info' | 'custom'): void {
    const texts = [`This is a ${type} alert.`, 'It closes by itself after a few seconds.'];

    switch (type) {
      case 'success':
        this.alertService.successes(texts, true, 'Success');
        break;
      case 'warning':
        this.alertService.warnings(texts, true, 'Warning');
        break;
      case 'danger':
        this.alertService.dangers(texts, true, 'Danger');
        break;
      case 'info':
        this.alertService.infos(texts, true, 'Info');
        break;
      default:
        this.alertService.customs(texts, this.currentStyle, true, 'Custom', 'pets');
        break;
    }
  }

  showPersistentAlert(): void {
    this.alertService.infos(
      ['This alert stays until you dismiss, accept or reject it.'],
      false,
      'Persistent',
    );
  }

  onSelectedChanged(dropdownOption: DropdownOption): void {
    switch (dropdownOption.value) {
      case 'success':
        this.alertService.successes(['Selected option: ' + dropdownOption.label], true, 'Success');
        break;
      case 'warning':
        this.alertService.warnings(['Selected option: ' + dropdownOption.label], true, 'Warning');
        break;
      case 'danger':
        this.alertService.dangers(['Selected option: ' + dropdownOption.label], true, 'Danger');
        break;
      case 'info':
        this.alertService.infos(['Selected option: ' + dropdownOption.label], true, 'Info');
        break;
      default:
        this.alertService.customs(
          ['Selected option: ' + dropdownOption.label],
          MonkeyStyle.PRIMARY,
          true,
          'Primary',
          'looks_one',
        );
        break;
    }
  }

  submitForm(): void {
    this.alertService.successes(
      ['Formulario válido.', 'Datos enviados:', JSON.stringify(this.form.value)],
      true,
      'Success',
    );
  }

  resetForm(): void {
    this.form.reset();
  }
}
