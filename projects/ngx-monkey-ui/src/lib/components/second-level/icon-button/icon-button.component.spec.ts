import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MonkeyIconButton } from './icon-button.component';
import { NgxMonkeyUiModule } from '../../../ngx-monkey-ui.module';

describe('IconButtonComponent', () => {
  let component: MonkeyIconButton;
  let fixture: ComponentFixture<MonkeyIconButton>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [NgxMonkeyUiModule]
    });
    fixture = TestBed.createComponent(MonkeyIconButton);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
