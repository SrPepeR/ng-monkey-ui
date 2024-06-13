import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MonkeyUnfocus } from './unfocus.component';

describe('UnfocusComponent', () => {
  let component: MonkeyUnfocus;
  let fixture: ComponentFixture<MonkeyUnfocus>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MonkeyUnfocus]
    });
    fixture = TestBed.createComponent(MonkeyUnfocus);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
