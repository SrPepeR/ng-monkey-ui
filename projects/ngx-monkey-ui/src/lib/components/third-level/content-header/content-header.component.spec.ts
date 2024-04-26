import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MonkeyContentHeader } from './content-header.component';

describe('ContentHeaderComponent', () => {
  let component: MonkeyContentHeader;
  let fixture: ComponentFixture<MonkeyContentHeader>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MonkeyContentHeader]
    });
    fixture = TestBed.createComponent(MonkeyContentHeader);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
