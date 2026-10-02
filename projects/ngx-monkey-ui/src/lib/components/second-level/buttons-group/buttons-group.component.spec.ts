import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MonkeyButtonsGroup } from './buttons-group.component';
import { NgxMonkeyUiModule } from '../../../ngx-monkey-ui.module';

describe('ButtonsGroupComponent', () => {
  let component: MonkeyButtonsGroup;
  let fixture: ComponentFixture<MonkeyButtonsGroup>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [NgxMonkeyUiModule],
    });
    fixture = TestBed.createComponent(MonkeyButtonsGroup);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
