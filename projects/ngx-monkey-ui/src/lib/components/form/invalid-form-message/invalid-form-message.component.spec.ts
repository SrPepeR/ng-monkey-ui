import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InvalidFormMessageComponent } from './invalid-form-message.component';

describe('InvalidFormMessageComponent', () => {
  let component: InvalidFormMessageComponent;
  let fixture: ComponentFixture<InvalidFormMessageComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [InvalidFormMessageComponent]
    });
    fixture = TestBed.createComponent(InvalidFormMessageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
