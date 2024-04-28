import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MonkeyHeader } from './header.component';

describe('HeaderComponent', () => {
  let component: MonkeyHeader;
  let fixture: ComponentFixture<MonkeyHeader>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MonkeyHeader]
    });
    fixture = TestBed.createComponent(MonkeyHeader);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
