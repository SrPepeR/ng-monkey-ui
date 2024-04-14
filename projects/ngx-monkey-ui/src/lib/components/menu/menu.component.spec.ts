import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MonkeyMenu } from './menu.component';

describe('MenuComponent', () => {
  let component: MonkeyMenu;
  let fixture: ComponentFixture<MonkeyMenu>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MonkeyMenu]
    });
    fixture = TestBed.createComponent(MonkeyMenu);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
