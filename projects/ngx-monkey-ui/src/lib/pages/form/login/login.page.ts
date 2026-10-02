import { Component, EventEmitter, Input, OnChanges, OnInit, Output } from '@angular/core';
import { Styleable } from '../../../bases/styleable.base';
import { ThemeService } from '../../../services/theme.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MonkeyButtonData } from '../../../objects/classes/button-data.class';
import { MonkeyStyle } from '../../../objects/enums/style.enum';
import { MonkeyInputTextType } from '../../../objects/enums/input-text-type.enum';

@Component({
  selector: 'monkey-login-page',
  templateUrl: './login.page.html',
  styleUrls: ['../../../styles/components/_common.default.style.scss', './login.page.scss'],
})
export class MonkeyLoginPage extends Styleable implements OnInit, OnChanges {
  /**
   * The header text for the login page.
   */
  @Input() header = 'Login form';

  // EMAIL

  /**
   * The icon to be displayed for the email input field.
   */
  @Input() emailIcon = 'email';

  /**
   * The label for the email input field.
   */
  @Input() emailLabel = 'Email';

  /**
   * The placeholder text for the email input field.
   */
  @Input() emailPlaceholder = 'Enter your email';

  /**
   * The name of the email control.
   */
  EMAIL_CONTROL_NAME = 'email';

  /**
   * The type of input for the email field.
   */
  EMAIL_INPUT_TYPE: MonkeyInputTextType = MonkeyInputTextType.EMAIL;

  // PASSWORD

  /**
   * The icon to be displayed for the password field.
   */
  @Input() passwordIcon = 'lock';

  /**
   * The label for the password input field.
   */
  @Input() passwordLabel = 'Password';

  /**
   * The placeholder text for the password input field.
   */
  @Input() passwordPlaceholder = 'Enter your password';

  /**
   * The name of the password control.
   */
  PASSWORD_CONTROL_NAME = 'password';

  /**
   * The input type for the password field.
   */
  PASSWORD_INPUT_TYPE: MonkeyInputTextType = MonkeyInputTextType.PASSWORD;

  // FORGOT PASSWORD

  /**
   * Label for the "Forgot password?" link.
   */
  @Input() forgotPasswordLabel = 'Forgot password?';

  /**
   * Event emitter for the "Forgot Password" event.
   * This event is triggered when the user clicks on the "Forgot Password" button.
   */
  @Output() onForgotPassword = new EventEmitter<void>();

  // REGISTER

  /**
   * The icon to be displayed for the register button.
   */
  @Input() registerIcon = 'person_add';

  /**
   * The label for the register button.
   */
  @Input() registerLabel = 'Register';

  /**
   * Event emitter for the register action.
   * This event is emitted when the user clicks on the register button.
   */
  @Output() onRegister = new EventEmitter<void>();

  // LOGIN

  /**
   * The icon to be displayed for the login button.
   */
  @Input() loginIcon = 'login';

  /**
   * The label for the login input field.
   */
  @Input() loginLabel = 'Login';

  /**
   * Event emitter for the login event.
   * Emits an object containing the email and password.
   *
   * @event onLogin
   * @type {EventEmitter<{ email: string, password: string }>}
   */
  @Output() onLogin = new EventEmitter<{ email: string; password: string }>();

  // CONTINUE AS GUEST

  /**
   * Indicates whether the user can continue as a guest.
   *
   * @remarks
   * This property determines if the user has the option to continue using the application as a guest.
   *
   * @defaultValue 'false'
   */
  @Input() canContinueAsGuest = 'false';

  /**
   * The icon to be displayed for the "Continue as Guest" option.
   */
  @Input() continueAsGuestIcon = 'arrow_forward';

  /**
   * The label for the "Continue as guest" button.
   */
  @Input() continueAsGuestLabel = 'Continue as guest';

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
  loginActions: MonkeyButtonData[] = [];

  /**
   * Observable that emits a boolean indicating whether the theme is in dark mode or not.
   */
  isDarkMode$ = this.themeService.isDarkMode$;

  /**
   * Creates an instance of MonkeyContentHeader.
   * @param themeService The theme service.
   */
  constructor(private themeService: ThemeService) {
    super();
  }

  override ngOnInit(): void {
    super.ngOnInit();

    this.buildLoginActions();
  }

  /**
   * Rebuilds the actions when an input changes, so they always show the given labels and icons.
   */
  override ngOnChanges(): void {
    super.ngOnChanges();

    this.buildLoginActions();
  }

  /**
   * Handles the Enter key pressed inside the login form.
   * Logs in when the form is valid, or continues as guest when that is allowed.
   */
  onEnterKey() {
    if (this.form.valid) {
      this.login();
    } else if (this.check(this.canContinueAsGuest)) {
      this.onContinueAsGuest.emit();
    }
  }

  /**
   * Emits the login event with the form values when the form is valid.
   */
  private login() {
    if (this.form.valid) {
      this.onLogin.emit({
        email: this.form.get(this.EMAIL_CONTROL_NAME)?.value,
        password: this.form.get(this.PASSWORD_CONTROL_NAME)?.value,
      });
    }
  }

  /**
   * Builds the actions from the current inputs.
   */
  private buildLoginActions() {
    this.loginActions = [
      new MonkeyButtonData(
        MonkeyStyle.PRIMARY,
        this.loginLabel,
        () => this.login(),
        this.loginIcon,
        'right',
      ),
      new MonkeyButtonData(
        MonkeyStyle.SECONDARY,
        this.registerLabel,
        () => this.onRegister.emit(),
        this.registerIcon,
        'right',
      ),
    ];

    if (this.check(this.canContinueAsGuest)) {
      this.loginActions.push(
        new MonkeyButtonData(
          MonkeyStyle.TERTIARY,
          this.continueAsGuestLabel,
          () => this.onContinueAsGuest.emit(),
          this.continueAsGuestIcon,
          'right',
        ),
      );
    }
  }
}
