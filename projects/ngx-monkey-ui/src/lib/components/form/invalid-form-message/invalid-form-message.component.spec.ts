import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InvalidFormMessageComponent } from './invalid-form-message.component';
import { NgxMonkeyUiModule } from '../../../ngx-monkey-ui.module';

describe('InvalidFormMessageComponent', () => {
  let component: InvalidFormMessageComponent;
  let fixture: ComponentFixture<InvalidFormMessageComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [NgxMonkeyUiModule],
    });
    fixture = TestBed.createComponent(InvalidFormMessageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
