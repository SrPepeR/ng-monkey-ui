import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MonkeyInputText } from './input-text.component';

describe('InputTextComponent', () => {
  let component: MonkeyInputText;
  let fixture: ComponentFixture<MonkeyInputText>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MonkeyInputText]
    });
    fixture = TestBed.createComponent(MonkeyInputText);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
