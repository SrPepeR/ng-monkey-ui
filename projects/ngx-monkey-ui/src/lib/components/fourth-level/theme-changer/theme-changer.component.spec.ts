import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MonkeyThemeChanger } from './theme-changer.component';

describe('ThemeChangerComponent', () => {
  let component: MonkeyThemeChanger;
  let fixture: ComponentFixture<MonkeyThemeChanger>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MonkeyThemeChanger]
    });
    fixture = TestBed.createComponent(MonkeyThemeChanger);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
