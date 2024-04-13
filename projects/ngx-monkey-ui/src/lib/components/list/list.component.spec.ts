import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MonkeyList } from './list.component';

describe('ListComponent', () => {
  let component: MonkeyList;
  let fixture: ComponentFixture<MonkeyList>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MonkeyList]
    });
    fixture = TestBed.createComponent(MonkeyList);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
