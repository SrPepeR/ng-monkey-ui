import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Styleable } from '../../../bases/styleable.base';
import { ThemeService } from '../../../services/theme.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MonkeyButtonData } from '../../../objects/classes/button-data.class';
import { MonkeyStyle } from '../../../objects/enums/style.enum';
import { MonkeyInputTextType } from '../../../objects/enums/input-text-type.enum';

@Component({
  selector: 'monkey-login-page',
  templateUrl: './login.page.html',
  styleUrls: [
    '../../../styles/components/_common.default.style.scss',
    './login.page.scss',
  ]
})
export class MonkeyLoginPage extends Styleable {

  /**
   * The header text for the login page.
   */
  @Input() header: string = 'Login form';

  // EMAIL

  /**
   * The icon to be displayed for the email input field.
   */
  @Input() emailIcon: string = 'email';

  /**
   * The label for the email input field.
   */
  @Input() emailLabel: string = 'Email';

  /**
   * The placeholder text for the email input field.
   */
  @Input() emailPlaceholder: string = 'Enter your email';

  /**
   * The name of the email control.
   */
  EMAIL_CONTROL_NAME: string = 'email';

  /**
   * The type of input for the email field.
   */
  EMAIL_INPUT_TYPE: MonkeyInputTextType = MonkeyInputTextType.EMAIL;

  // PASSWORD

  /**
   * The icon to be displayed for the password field.
   */
  @Input() passwordIcon: string = 'lock';

  /**
   * The label for the password input field.
   */
  @Input() passwordLabel: string = 'Password';

  /**
   * The placeholder text for the password input field.
   */
  @Input() passwordPlaceholder: string = 'Enter your password';

  /**
   * The name of the password control.
   */
  PASSWORD_CONTROL_NAME: string = 'password';

  /**
   * The input type for the password field.
   */
  PASSWORD_INPUT_TYPE: MonkeyInputTextType = MonkeyInputTextType.PASSWORD;

  // FORGOT PASSWORD

  /**
   * Label for the "Forgot password?" link.
   */
  @Input() forgotPasswordLabel: string = 'Forgot password?';

  /**
   * Event emitter for the "Forgot Password" event.
   * This event is triggered when the user clicks on the "Forgot Password" button.
   */
  @Output() onForgotPassword = new EventEmitter<void>();

  // REGISTER

  /**
   * The icon to be displayed for the register button.
   */
  @Input() registerIcon: string = 'person_add';

  /**
   * The label for the register button.
   */
  @Input() registerLabel: string = 'Register';

  /**
   * Event emitter for the register action.
   * This event is emitted when the user clicks on the register button.
   */
  @Output() onRegister = new EventEmitter<void>();

  // LOGIN

  /**
   * The icon to be displayed for the login button.
   */
  @Input() loginIcon: string = 'login';

  /**
   * The label for the login input field.
   */
  @Input() loginLabel: string = 'Login';

  /**
   * Event emitter for the login event.
   * Emits an object containing the email and password.
   *
   * @event onLogin
   * @type {EventEmitter<{ email: string, password: string }>}
   */
  @Output() onLogin = new EventEmitter<{ email: string, password: string }>();

  // CONTINUE AS GUEST

  /**
   * Indicates whether the user can continue as a guest.
   * 
   * @remarks
   * This property determines if the user has the option to continue using the application as a guest.
   * 
   * @defaultValue 'false'
   */
  @Input() canContinueAsGuest: string = 'false';

  /**
   * The icon to be displayed for the "Continue as Guest" option.
   */
  @Input() continueAsGuestIcon: string = 'arrow_forward';

  /**
   * The label for the "Continue as guest" button.
   */
  @Input() continueAsGuestLabel: string = 'Continue as guest';

  /**
   * Event emitter for continuing as a guest.
   */
  @Output() onContinueAsGuest = new EventEmitter<void>();

  /**
   * Represents the login form.
   */
  form: FormGroup = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required]),
  });

  /**
   * Represents the login actions for the login page.
   */
  loginActions: MonkeyButtonData[] = [
    new MonkeyButtonData(
      MonkeyStyle.PRIMARY,
      this.loginLabel,
      () => {
        if (this.form.valid) {
          this.onLogin.emit({
            email: this.form.get(this.EMAIL_CONTROL_NAME)?.value,
            password: this.form.get(this.PASSWORD_CONTROL_NAME)?.value,
          });
        }
      },
      this.loginIcon,
      'right'
    ),
    new MonkeyButtonData(
      MonkeyStyle.SECONDARY,
      this.registerLabel,
      () => {
        this.onRegister.emit();
      },
      this.registerIcon,
      'right'
    ),
  ];

  /**
   * Observable that emits a boolean indicating whether the theme is in dark mode or not.
   */
  isDarkMode$ = this.themeService.isDarkMode$;

  /**
   * Creates an instance of MonkeyContentHeader.
   * @param themeService The theme service.
   */
  constructor(
    private themeService: ThemeService,
  ) {
    super();
  }

  override ngOnInit(): void {
    super.ngOnInit();

    if (this.check(this.canContinueAsGuest)) {
      this.addContinueAsGuestAction();
    }

    this.handleEnterKey();
  }

  /**
   * Handles the 'Enter' key press event.
   */
  private handleEnterKey() {
    document.addEventListener('keydown', (event) => {
      if (event.key === 'Enter') {
        if (this.form.valid) {
          this.onLogin.emit({
            email: this.form.get(this.EMAIL_CONTROL_NAME)?.value,
            password: this.form.get(this.PASSWORD_CONTROL_NAME)?.value,
          });
        } else if (this.check(this.canContinueAsGuest)) {
          this.onContinueAsGuest.emit();
        }
      }
    });
  }

  /**
   * Adds the "Continue as Guest" action to the login actions array.
   */
  private addContinueAsGuestAction() {
    this.loginActions.push(
      new MonkeyButtonData(
        MonkeyStyle.TERTIARY,
        this.continueAsGuestLabel,
        () => {
          this.onContinueAsGuest.emit();
        },
        this.continueAsGuestIcon,
        'right'
      )
    );
  }
}
