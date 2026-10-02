import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MonkeySwitch } from './switch.component';
import { NgxMonkeyUiModule } from '../../../ngx-monkey-ui.module';

describe('SwitchComponent', () => {
  let component: MonkeySwitch;
  let fixture: ComponentFixture<MonkeySwitch>;

  const create = (): ComponentFixture<MonkeySwitch> => {
    const created = TestBed.createComponent(MonkeySwitch);
    created.detectChanges();
    return created;
  };

  const nativeInput = (target: ComponentFixture<MonkeySwitch>): HTMLInputElement =>
    target.nativeElement.querySelector('input');

  const sideLabels = (): HTMLLabelElement[] =>
    Array.from(fixture.nativeElement.querySelectorAll('label.switch-label'));

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
    expect(sideLabels().length).toBe(2);
    sideLabels().forEach((label) => expect(label.htmlFor).toBe(nativeInput(fixture).id));
  });

  it('clicking a side label switches once', () => {
    const emitted: boolean[] = [];
    component.onSwitch.subscribe((checked) => emitted.push(checked));

    sideLabels()[1].click();
    fixture.detectChanges();

    expect(emitted).toEqual([true]);
    expect(nativeInput(fixture).checked).toBeTrue();
  });
});
