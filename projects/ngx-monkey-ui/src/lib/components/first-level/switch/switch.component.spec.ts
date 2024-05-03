import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MonkeySwitch } from './switch.component';

describe('SwitchComponent', () => {
  let component: MonkeySwitch;
  let fixture: ComponentFixture<MonkeySwitch>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MonkeySwitch]
    });
    fixture = TestBed.createComponent(MonkeySwitch);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
