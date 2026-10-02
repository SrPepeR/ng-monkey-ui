import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MonkeyLoginPage } from './login.page';
import { NgxMonkeyUiModule } from '../../../ngx-monkey-ui.module';

describe('LoginComponent', () => {
  let component: MonkeyLoginPage;
  let fixture: ComponentFixture<MonkeyLoginPage>;
  let logins: { email: string; password: string }[];

  const pressEnter = (target: EventTarget) => {
    target.dispatchEvent(new KeyboardEvent('keydown', { key: 'Enter', bubbles: true }));
    fixture.detectChanges();
  };

  const fillValidForm = () => {
    component.form.setValue({ email: 'monkey@example.com', password: 'banana' });
    fixture.detectChanges();
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [NgxMonkeyUiModule],
    });
    fixture = TestBed.createComponent(MonkeyLoginPage);
    component = fixture.componentInstance;
    logins = [];
    component.onLogin.subscribe((login) => logins.push(login));
  });

  it('should create', () => {
    fixture.detectChanges();

    expect(component).toBeTruthy();
  });

  it('uses the custom labels and icons in the actions', () => {
    fixture.componentRef.setInput('loginLabel', 'Sign in');
    fixture.componentRef.setInput('loginIcon', 'key');
    fixture.componentRef.setInput('registerLabel', 'Sign up');
    fixture.componentRef.setInput('registerIcon', 'add');
    fixture.componentRef.setInput('canContinueAsGuest', 'true');
    fixture.componentRef.setInput('continueAsGuestLabel', 'Skip');
    fixture.componentRef.setInput('continueAsGuestIcon', 'skip_next');
    fixture.detectChanges();

    expect(component.loginActions.map((action) => [action.text, action.icon])).toEqual([
      ['Sign in', 'key'],
      ['Sign up', 'add'],
      ['Skip', 'skip_next'],
    ]);
  });

  it('updates the actions when a label input changes', () => {
    fixture.detectChanges();

    fixture.componentRef.setInput('loginLabel', 'Enter');
    fixture.detectChanges();

    expect(component.loginActions[0].text).toBe('Enter');
  });

  it('Enter inside the form emits onLogin', () => {
    fixture.detectChanges();
    fillValidForm();

    pressEnter(fixture.nativeElement.querySelector('.login-form input'));

    expect(logins).toEqual([{ email: 'monkey@example.com', password: 'banana' }]);
  });

  it('Enter outside the form does not emit onLogin', () => {
    fixture.detectChanges();
    fillValidForm();

    pressEnter(document.body);

    expect(logins).toEqual([]);
  });
});
