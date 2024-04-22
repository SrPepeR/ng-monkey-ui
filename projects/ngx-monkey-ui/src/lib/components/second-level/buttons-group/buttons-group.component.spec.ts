import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MonkeyButtonsGroup } from './buttons-group.component';

describe('ButtonsGroupComponent', () => {
  let component: MonkeyButtonsGroup;
  let fixture: ComponentFixture<MonkeyButtonsGroup>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MonkeyButtonsGroup]
    });
    fixture = TestBed.createComponent(MonkeyButtonsGroup);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
