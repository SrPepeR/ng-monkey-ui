import { Component, Input, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Subscription } from 'rxjs';

import { ComponentsStylesService } from '../../services/components-styles.service';
import { MonkeyScreenService } from '../../services/screen/screen.service';
import { Styleable } from '../styleable.base';
import { FormControl, FormGroup } from '@angular/forms';

/**
 * Base class for styleable components.
 */
@Component({
  // eslint-disable-next-line @angular-eslint/component-selector -- Abstract base; becomes an @Directive() in roadmap 14.5.
  selector: '',
  template: '',
  providers: [ComponentsStylesService, MonkeyScreenService],
})
/**
 * Represents a base class for styleable components.
 * Provides common style and type properties for components.
 */
export class MonkeyInput extends Styleable implements OnInit, OnDestroy {
  /**
   * The input element.
   */
  @ViewChild('input') input: any;

  /**
   * The label for the text input.
   */
  @Input() label = 'Text input';

  /**
   * The alternative text for the input element.
   */
  @Input() alt?: string;

  /**
   * Represents the form group that the input text component belongs to.
   */
  @Input() formGroup!: FormGroup;

  /**
   * The name of the input field.
   */
  @Input() name!: string;

  /**
   * Indicates whether the input is required or not.
   *
   * @remarks
   * The value of this property should be a string representation of a boolean value ('true' or 'false').
   * If set to 'true', the input will be marked as required.
   * If set to 'false' or '' (default), the input will not be marked as required.
   */
  @Input() required = 'false';

  // ICONS

  /**
   * The icon to be displayed alongside the input field.
   */
  @Input() icon?: string;

  /**
   * The icon to be displayed when the input is valid.
   */
  @Input() validIcon?: string = 'check_circle';

  /**
   * The icon to display when the input is invalid.
   * Defaults to 'cancel'.
   */
  @Input() invalidIcon = 'cancel';

  /**
   * The icon to be displayed for the required field indicator.
   * Defaults to 'star'.
   */
  @Input() requiredIcon?: string = 'star';

  /**
   * Determines the width of the input component.
   *
   * @remarks
   * The `wFull` property accepts a string value that specifies the width of the input component.
   *
   * @defaultValue 'false'
   */
  @Input() wFull = 'false';

  /**
   * Indicates whether the input text is deleteable or not.
   * If set to 'true', a delete button will be displayed next to the input text.
   * If set to 'false' (default), no delete button will be displayed.
   */
  @Input() deleteable = 'false';

  /**
   * Determines whether to show the invalid message for the input.
   *
   * @default 'false'
   */
  @Input() dontShowInvalidMessage = 'false';

  /**
   * Array of invalid messages for the input.
   */
  invalidMessages: string[] = [];

  /**
   * Subscription to the events of the form control, to keep the messages up to date.
   */
  private controlEventsSubscription?: Subscription;

  override ngOnInit() {
    super.ngOnInit();

    const control = this.formGroup?.get(this.name) as FormControl | null;
    this.controlEventsSubscription = control?.events.subscribe(() =>
      this.generateInvalidMessages(control),
    );
  }

  ngOnDestroy() {
    this.controlEventsSubscription?.unsubscribe();
  }

  /**
   * Handles the click event on the label element.
   * Sets focus on the input element.
   */
  labelClicked() {
    this.input.nativeElement.focus();
  }

  /**
   * Resets the input value to its initial state.
   */
  resetInput() {
    this.formGroup.get(this.name)?.reset();
  }

  /**
   * Handles the input change event.
   */
  inputChanged(): void {
    const control = this.formGroup.get(this.name) as FormControl;
    this.generateInvalidMessages(control);
  }

  /**
   * Generates invalid messages for a given form control.
   * The messages are only shown once the user has changed or left the control.
   * @param control - The form control to generate invalid messages for.
   */
  private generateInvalidMessages(control: FormControl<any>) {
    const messages: string[] = [];

    if (control?.errors && (control.dirty || control.touched)) {
      if (control.errors) {
        Object.keys(control.errors).forEach((key) => {
          switch (key) {
            case 'required':
              messages.push('This field is required');
              break;
            case 'minlength':
              messages.push(
                `This field must have at least ${control.errors![key].requiredLength} characters`,
              );
              break;
            case 'maxlength':
              messages.push(
                `This field must have at most ${control.errors![key].requiredLength} characters`,
              );
              break;
            case 'email':
              messages.push('This field must be a valid email address');
              break;
            case 'pattern':
              messages.push(
                `This field must match the following pattern: ${control.errors![key].requiredPattern}`,
              );
              break;
            case 'min':
              messages.push(
                `This field must be greater than or equal to ${control.errors![key].min}`,
              );
              break;
            case 'max':
              messages.push(`This field must be less than or equal to ${control.errors![key].max}`);
              break;
            default:
              break;
          }
        });
      }
    }

    this.invalidMessages = messages;
  }
}
