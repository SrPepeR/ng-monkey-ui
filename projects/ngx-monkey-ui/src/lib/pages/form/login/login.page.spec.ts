import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MonkeyLoginPage } from './login.page';

describe('LoginComponent', () => {
  let component: MonkeyLoginPage;
  let fixture: ComponentFixture<MonkeyLoginPage>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MonkeyLoginPage]
    });
    fixture = TestBed.createComponent(MonkeyLoginPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
