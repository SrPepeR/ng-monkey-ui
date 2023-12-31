import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MonkeyCard } from './card.component';

describe('CardComponent', () => {
  let component: MonkeyCard;
  let fixture: ComponentFixture<MonkeyCard>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MonkeyCard]
    });
    fixture = TestBed.createComponent(MonkeyCard);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
