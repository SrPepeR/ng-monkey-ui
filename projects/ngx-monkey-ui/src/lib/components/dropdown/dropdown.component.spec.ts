import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MonkeyDropdown } from './dropdown.component';

describe('DropdownComponent', () => {
  let component: MonkeyDropdown;
  let fixture: ComponentFixture<MonkeyDropdown>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MonkeyDropdown]
    });
    fixture = TestBed.createComponent(MonkeyDropdown);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
