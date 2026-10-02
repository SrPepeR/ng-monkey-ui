import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormControl, FormGroup } from '@angular/forms';

import { MonkeyInputNumber } from './input-number.component';
import { NgxMonkeyUiModule } from '../../../ngx-monkey-ui.module';
import { MonkeyInputNumberType } from '../../../objects/enums/input-number-type.enum';

describe('InputNumberComponent', () => {
  let component: MonkeyInputNumber;
  let fixture: ComponentFixture<MonkeyInputNumber>;
  let control: FormControl;

  const create = (inputType: MonkeyInputNumberType, value: unknown = '') => {
    control = new FormControl(value);
    fixture = TestBed.createComponent(MonkeyInputNumber);
    component = fixture.componentInstance;
    fixture.componentRef.setInput('formGroup', new FormGroup({ field: control }));
    fixture.componentRef.setInput('name', 'field');
    fixture.componentRef.setInput('inputType', inputType);
    fixture.detectChanges();
  };

  const nativeInput = (): HTMLInputElement => fixture.nativeElement.querySelector('input');

  /** Types into the native input, as a user would. */
  const type = (value: string) => {
    nativeInput().value = value;
    nativeInput().dispatchEvent(new Event('input'));
    fixture.detectChanges();
  };

  const wheelUp = (): WheelEvent => {
    const event = new WheelEvent('wheel', { deltaY: -1, cancelable: true });
    nativeInput().dispatchEvent(event);
    fixture.detectChanges();
    return event;
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [NgxMonkeyUiModule],
    });
  });

  afterEach(() => fixture.nativeElement.remove());

  it('should create', () => {
    create(MonkeyInputNumberType.NUMBER);

    expect(component).toBeTruthy();
  });

  it('writes a number in the control with inputType number', () => {
    create(MonkeyInputNumberType.NUMBER);

    type('5');
    expect(control.value).toBe(5);

    component.stepUp();
    expect(control.value).toBe(6);
  });

  it('keeps the string in the control with inputType tel', () => {
    create(MonkeyInputNumberType.PHONE);

    type('600123123');

    expect(control.value).toBe('600123123');
  });

  it('keeps the string in the control with inputType date', () => {
    create(MonkeyInputNumberType.DATE);

    type('2026-10-02');

    expect(control.value).toBe('2026-10-02');
  });

  it('the wheel steps the value only when the field is focused', () => {
    create(MonkeyInputNumberType.NUMBER, 5);
    document.body.appendChild(fixture.nativeElement);

    const unfocusedEvent = wheelUp();
    expect(control.value).toBe(5);
    expect(unfocusedEvent.defaultPrevented).toBeFalse();

    nativeInput().focus();
    const focusedEvent = wheelUp();
    expect(control.value).toBe(6);
    expect(focusedEvent.defaultPrevented).toBeTrue();
  });

  it('the wheel does nothing with a non-number inputType', () => {
    create(MonkeyInputNumberType.PHONE, '600123123');
    document.body.appendChild(fixture.nativeElement);
    nativeInput().focus();

    const event = wheelUp();

    expect(control.value).toBe('600123123');
    expect(event.defaultPrevented).toBeFalse();
  });
});
