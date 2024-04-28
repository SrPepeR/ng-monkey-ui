import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MonkeySubheader } from './subheader.component';

describe('SubheaderComponent', () => {
  let component: MonkeySubheader;
  let fixture: ComponentFixture<MonkeySubheader>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MonkeySubheader]
    });
    fixture = TestBed.createComponent(MonkeySubheader);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
