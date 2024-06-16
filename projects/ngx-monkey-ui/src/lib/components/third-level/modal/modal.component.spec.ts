import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MonkeyModal } from './modal.component';

describe('ModalComponent', () => {
  let component: MonkeyModal;
  let fixture: ComponentFixture<MonkeyModal>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MonkeyModal]
    });
    fixture = TestBed.createComponent(MonkeyModal);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
