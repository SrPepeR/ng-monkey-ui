import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MonkeyCheckbox } from './checkbox.component';
import { NgxMonkeyUiModule } from '../../../ngx-monkey-ui.module';

describe('CheckboxComponent', () => {
  let component: MonkeyCheckbox;
  let fixture: ComponentFixture<MonkeyCheckbox>;

  const create = (): ComponentFixture<MonkeyCheckbox> => {
    const created = TestBed.createComponent(MonkeyCheckbox);
    created.detectChanges();
    return created;
  };

  const nativeInput = (target: ComponentFixture<MonkeyCheckbox>): HTMLInputElement =>
    target.nativeElement.querySelector('input');

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [NgxMonkeyUiModule],
    });
    fixture = create();
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('two instances get different input ids', () => {
    const other = create();

    expect(nativeInput(fixture).id).toBeTruthy();
    expect(nativeInput(fixture).id).not.toBe(nativeInput(other).id);
    expect(nativeInput(fixture).name).not.toBe(nativeInput(other).name);
  });

  it('the label for points to the input id', () => {
    const label: HTMLLabelElement = fixture.nativeElement.querySelector('label');

    expect(label.htmlFor).toBe(nativeInput(fixture).id);
  });
});
