import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MonkeyIcon } from './icon.component';

describe('IconComponent', () => {
  let component: MonkeyIcon;
  let fixture: ComponentFixture<MonkeyIcon>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MonkeyIcon]
    });
    fixture = TestBed.createComponent(MonkeyIcon);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
