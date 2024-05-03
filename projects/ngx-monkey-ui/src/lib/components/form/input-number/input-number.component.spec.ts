import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MonkeyInputNumber } from './input-number.component';

describe('InputNumberComponent', () => {
  let component: MonkeyInputNumber;
  let fixture: ComponentFixture<MonkeyInputNumber>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MonkeyInputNumber]
    });
    fixture = TestBed.createComponent(MonkeyInputNumber);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
