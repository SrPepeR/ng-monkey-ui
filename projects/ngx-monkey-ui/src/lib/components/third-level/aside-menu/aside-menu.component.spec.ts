import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MonkeyAsideMenu } from './aside-menu.component';

describe('AsideMenuComponent', () => {
  let component: MonkeyAsideMenu;
  let fixture: ComponentFixture<MonkeyAsideMenu>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MonkeyAsideMenu]
    });
    fixture = TestBed.createComponent(MonkeyAsideMenu);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
