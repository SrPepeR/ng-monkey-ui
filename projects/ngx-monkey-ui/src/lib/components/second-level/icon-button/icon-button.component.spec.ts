import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MonkeyIconButton } from './icon-button.component';
import { NgxMonkeyUiModule } from '../../../ngx-monkey-ui.module';

describe('IconButtonComponent', () => {
  let component: MonkeyIconButton;
  let fixture: ComponentFixture<MonkeyIconButton>;
  let clicks: number;

  const nativeButton = (): HTMLButtonElement => fixture.nativeElement.querySelector('button');

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [NgxMonkeyUiModule],
    });
    fixture = TestBed.createComponent(MonkeyIconButton);
    component = fixture.componentInstance;
    clicks = 0;
    component.onClick.subscribe(() => clicks++);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('emits onClick once per click', () => {
    nativeButton().click();

    expect(clicks).toBe(1);
  });

  it('does not react to clicks outside the inner button', () => {
    (fixture.nativeElement.querySelector('monkey-button') as HTMLElement).click();

    expect(clicks).toBe(0);
  });

  it('does not emit onClick when disabled', () => {
    fixture.componentRef.setInput('disabled', 'true');
    fixture.detectChanges();

    nativeButton().click();

    expect(nativeButton().disabled).toBeTrue();
    expect(clicks).toBe(0);
  });
});
