import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';

import { MonkeyAsideMenu } from './aside-menu.component';
import { NgxMonkeyUiModule } from '../../../ngx-monkey-ui.module';

describe('AsideMenuComponent', () => {
  let component: MonkeyAsideMenu;
  let fixture: ComponentFixture<MonkeyAsideMenu>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [NgxMonkeyUiModule],
      providers: [provideRouter([])],
    });
    fixture = TestBed.createComponent(MonkeyAsideMenu);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
