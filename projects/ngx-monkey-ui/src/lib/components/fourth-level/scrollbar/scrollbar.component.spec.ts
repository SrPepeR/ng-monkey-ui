import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MonkeyScrollbar } from './scrollbar.component';

describe('ScrollbarComponent', () => {
  let component: MonkeyScrollbar;
  let fixture: ComponentFixture<MonkeyScrollbar>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MonkeyScrollbar]
    });
    fixture = TestBed.createComponent(MonkeyScrollbar);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
