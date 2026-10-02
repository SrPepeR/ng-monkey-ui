import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MonkeyLoginPage } from './login.page';
import { NgxMonkeyUiModule } from '../../../ngx-monkey-ui.module';

describe('LoginComponent', () => {
  let component: MonkeyLoginPage;
  let fixture: ComponentFixture<MonkeyLoginPage>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [NgxMonkeyUiModule],
    });
    fixture = TestBed.createComponent(MonkeyLoginPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
