import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MonkeyContentHeader } from './content-header.component';
import { NgxMonkeyUiModule } from '../../../ngx-monkey-ui.module';

describe('ContentHeaderComponent', () => {
  let component: MonkeyContentHeader;
  let fixture: ComponentFixture<MonkeyContentHeader>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [NgxMonkeyUiModule],
    });
    fixture = TestBed.createComponent(MonkeyContentHeader);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
