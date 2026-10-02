import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import { MonkeyInputText } from './input-text.component';
import { NgxMonkeyUiModule } from '../../../ngx-monkey-ui.module';

describe('InputTextComponent', () => {
  let component: MonkeyInputText;
  let fixture: ComponentFixture<MonkeyInputText>;
  let form: FormGroup;

  const createWithControl = (control: FormControl) => {
    form = new FormGroup({ field: control });
    fixture = TestBed.createComponent(MonkeyInputText);
    component = fixture.componentInstance;
    fixture.componentRef.setInput('formGroup', form);
    fixture.componentRef.setInput('name', 'field');
    fixture.detectChanges();
  };

  /** Types into the native input, as a user would. */
  const type = (value: string) => {
    const input: HTMLInputElement = fixture.nativeElement.querySelector('input');
    input.value = value;
    input.dispatchEvent(new Event('input'));
    fixture.detectChanges();
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [NgxMonkeyUiModule],
    });
  });

  it('should create', () => {
    createWithControl(new FormControl(''));

    expect(component).toBeTruthy();
  });

  // Validation messages come from the MonkeyInput base class.
  describe('validation messages (MonkeyInput)', () => {
    const MIN_LENGTH_MESSAGE = 'This field must have at least 3 characters';
    const REQUIRED_MESSAGE = 'This field is required';

    it('shows no message when the value is valid', () => {
      createWithControl(new FormControl('', [Validators.minLength(3)]));

      type('abcd');

      expect(component.invalidMessages).toEqual([]);
    });

    it('shows the message of a validator other than required', () => {
      createWithControl(new FormControl('', [Validators.minLength(3)]));

      type('ab');

      expect(component.invalidMessages).toEqual([MIN_LENGTH_MESSAGE]);
    });

    it('E-06: shows the required message when the value is empty', () => {
      createWithControl(new FormControl('', [Validators.required]));

      type('a');
      type('');

      expect(component.invalidMessages).toEqual([REQUIRED_MESSAGE]);
    });

    it('E-23: recalculates the messages after setValue()', () => {
      createWithControl(new FormControl('', [Validators.minLength(3)]));
      type('ab');

      form.get('field')!.setValue('abcd');
      fixture.detectChanges();

      expect(component.invalidMessages).toEqual([]);
    });

    it('E-23: recalculates the messages after reset()', () => {
      createWithControl(new FormControl('', [Validators.minLength(3)]));
      type('ab');

      form.reset();
      fixture.detectChanges();

      expect(component.invalidMessages).toEqual([]);
    });

    it('E-23: recalculates the messages after markAllAsTouched()', () => {
      createWithControl(new FormControl('ab', [Validators.minLength(3)]));

      form.markAllAsTouched();
      fixture.detectChanges();

      expect(component.invalidMessages).toEqual([MIN_LENGTH_MESSAGE]);
    });
  });
});
