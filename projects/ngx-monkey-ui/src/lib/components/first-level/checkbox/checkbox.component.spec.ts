import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MonkeyCheckbox } from './checkbox.component';

describe('CheckboxComponent', () => {
  let component: MonkeyCheckbox;
  let fixture: ComponentFixture<MonkeyCheckbox>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MonkeyCheckbox]
    });
    fixture = TestBed.createComponent(MonkeyCheckbox);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
