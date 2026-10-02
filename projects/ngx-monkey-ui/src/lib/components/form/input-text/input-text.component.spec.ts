import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormControl, FormGroup } from '@angular/forms';

import { MonkeyInputText } from './input-text.component';
import { NgxMonkeyUiModule } from '../../../ngx-monkey-ui.module';

describe('InputTextComponent', () => {
  let component: MonkeyInputText;
  let fixture: ComponentFixture<MonkeyInputText>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [NgxMonkeyUiModule],
    });
    fixture = TestBed.createComponent(MonkeyInputText);
    component = fixture.componentInstance;
    fixture.componentRef.setInput('formGroup', new FormGroup({ field: new FormControl('') }));
    fixture.componentRef.setInput('name', 'field');
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
