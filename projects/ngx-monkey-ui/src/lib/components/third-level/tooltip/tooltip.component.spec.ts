import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MonkeyTooltip } from './tooltip.component';

describe('TooltipComponent', () => {
  let component: MonkeyTooltip;
  let fixture: ComponentFixture<MonkeyTooltip>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MonkeyTooltip]
    });
    fixture = TestBed.createComponent(MonkeyTooltip);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
