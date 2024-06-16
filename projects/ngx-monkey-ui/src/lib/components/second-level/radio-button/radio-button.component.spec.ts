import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MonkeyRadioButton } from './radio-button.component';

describe('RadioButtonComponent', () => {
  let component: MonkeyRadioButton;
  let fixture: ComponentFixture<MonkeyRadioButton>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MonkeyRadioButton]
    });
    fixture = TestBed.createComponent(MonkeyRadioButton);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
