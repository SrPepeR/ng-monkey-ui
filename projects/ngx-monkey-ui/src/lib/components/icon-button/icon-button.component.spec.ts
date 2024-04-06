import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MonkeyIconButton } from './icon-button.component';

describe('IconButtonComponent', () => {
  let component: MonkeyIconButton;
  let fixture: ComponentFixture<MonkeyIconButton>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MonkeyIconButton]
    });
    fixture = TestBed.createComponent(MonkeyIconButton);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
