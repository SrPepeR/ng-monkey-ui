import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormControl, FormGroup } from '@angular/forms';

import { MonkeyInputNumber } from './input-number.component';
import { NgxMonkeyUiModule } from '../../../ngx-monkey-ui.module';

describe('InputNumberComponent', () => {
  let component: MonkeyInputNumber;
  let fixture: ComponentFixture<MonkeyInputNumber>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [NgxMonkeyUiModule],
    });
    fixture = TestBed.createComponent(MonkeyInputNumber);
    component = fixture.componentInstance;
    fixture.componentRef.setInput('formGroup', new FormGroup({ field: new FormControl('') }));
    fixture.componentRef.setInput('name', 'field');
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
