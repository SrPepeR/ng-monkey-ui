import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';

import { MonkeyMenu } from './menu.component';
import { NgxMonkeyUiModule } from '../../../ngx-monkey-ui.module';

describe('MenuComponent', () => {
  let component: MonkeyMenu;
  let fixture: ComponentFixture<MonkeyMenu>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [NgxMonkeyUiModule],
      providers: [provideRouter([])]
    });
    fixture = TestBed.createComponent(MonkeyMenu);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
