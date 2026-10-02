import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BehaviorSubject } from 'rxjs';

import { MonkeyScrollbar } from './scrollbar.component';
import { ThemeService } from '../../../services/theme.service';

describe('ScrollbarComponent', () => {
  let component: MonkeyScrollbar;
  let fixture: ComponentFixture<MonkeyScrollbar>;
  let darkMode$: BehaviorSubject<boolean>;

  const scrollbarStyles = (): HTMLStyleElement[] =>
    Array.from(document.head.querySelectorAll('style')).filter((style) =>
      style.textContent?.includes('::-webkit-scrollbar-thumb'),
    );

  beforeEach(() => {
    darkMode$ = new BehaviorSubject(false);
    TestBed.configureTestingModule({
      declarations: [MonkeyScrollbar],
      providers: [{ provide: ThemeService, useValue: { isDarkMode$: darkMode$ } }],
    });
    fixture = TestBed.createComponent(MonkeyScrollbar);
    component = fixture.componentInstance;
  });

  afterEach(() => fixture.destroy());

  it('should create', () => {
    fixture.detectChanges();

    expect(component).toBeTruthy();
  });

  it('uses the custom colors given as inputs', () => {
    fixture.componentRef.setInput('thumbLight', 'rgb(1, 2, 3)');
    fixture.componentRef.setInput('thumbDark', 'rgb(4, 5, 6)');
    fixture.detectChanges();

    expect(scrollbarStyles()[0].textContent).toContain('rgb(1, 2, 3)');

    darkMode$.next(true);

    expect(scrollbarStyles()[0].textContent).toContain('rgb(4, 5, 6)');
  });

  it('keeps a single style element after several theme changes', () => {
    fixture.detectChanges();

    darkMode$.next(true);
    darkMode$.next(false);
    darkMode$.next(true);

    expect(scrollbarStyles().length).toBe(1);
  });

  it('stops listening to the theme on destroy', () => {
    fixture.detectChanges();

    fixture.destroy();
    darkMode$.next(true);

    expect(darkMode$.observed).toBeFalse();
    expect(scrollbarStyles().length).toBe(0);
  });
});
