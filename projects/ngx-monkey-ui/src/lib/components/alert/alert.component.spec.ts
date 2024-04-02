import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MonkeyAlert } from './alert.component';

describe('AlertComponent', () => {
  let component: MonkeyAlert;
  let fixture: ComponentFixture<MonkeyAlert>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MonkeyAlert]
    });
    fixture = TestBed.createComponent(MonkeyAlert);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
