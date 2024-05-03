import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MonkeyImage } from './image.component';

describe('ImageComponent', () => {
  let component: MonkeyImage;
  let fixture: ComponentFixture<MonkeyImage>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MonkeyImage]
    });
    fixture = TestBed.createComponent(MonkeyImage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
