import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MonkeyLoader } from './loader.component';

describe('LoaderComponent', () => {
  let component: MonkeyLoader;
  let fixture: ComponentFixture<MonkeyLoader>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MonkeyLoader]
    });
    fixture = TestBed.createComponent(MonkeyLoader);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
