import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MonkeyCarousel } from './carousel.component';

describe('CarrousselComponent', () => {
  let component: MonkeyCarousel;
  let fixture: ComponentFixture<MonkeyCarousel>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MonkeyCarousel]
    });
    fixture = TestBed.createComponent(MonkeyCarousel);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
