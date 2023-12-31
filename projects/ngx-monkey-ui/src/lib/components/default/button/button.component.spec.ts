import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MonkeyButton } from './button.component';

describe('ButtonComponent', () => {
  let component: MonkeyButton;
  let fixture: ComponentFixture<MonkeyButton>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MonkeyButton]
    });
    fixture = TestBed.createComponent(MonkeyButton);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
