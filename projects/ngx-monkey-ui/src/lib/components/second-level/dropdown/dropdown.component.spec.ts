import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MonkeyDropdown } from './dropdown.component';
import { NgxMonkeyUiModule } from '../../../ngx-monkey-ui.module';

describe('DropdownComponent', () => {
  let component: MonkeyDropdown;
  let fixture: ComponentFixture<MonkeyDropdown>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [NgxMonkeyUiModule],
    });
    fixture = TestBed.createComponent(MonkeyDropdown);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
