import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MonkeyRadioButtonsGroup } from './radio-buttons-group.component';

describe('RadioButtonsGroupComponent', () => {
  let component: MonkeyRadioButtonsGroup;
  let fixture: ComponentFixture<MonkeyRadioButtonsGroup>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MonkeyRadioButtonsGroup]
    });
    fixture = TestBed.createComponent(MonkeyRadioButtonsGroup);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
