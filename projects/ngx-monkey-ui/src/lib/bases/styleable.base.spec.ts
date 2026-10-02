import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';

import { NgxMonkeyUiModule } from '../ngx-monkey-ui.module';
import { MonkeyButton } from '../components/first-level/button/button.component';
import { MonkeyLoader } from '../components/first-level/loader/loader.component';
import { MonkeyStyle } from '../objects/enums/style.enum';

/**
 * `Styleable` is abstract in practice, so it is tested through `MonkeyButton` (plain subclass)
 * and `MonkeyLoader` (subclass that adds its own classes).
 */
describe('Styleable', () => {
  /** Time that `Styleable.ngOnChanges` waits before it recalculates the classes. */
  const CHANGES_DELAY = 300;

  beforeEach(() => {
    TestBed.configureTestingModule({ imports: [NgxMonkeyUiModule] });
  });

  describe('through MonkeyButton', () => {
    let fixture: ComponentFixture<MonkeyButton>;

    beforeEach(() => {
      fixture = TestBed.createComponent(MonkeyButton);
    });

    it('applies classList from the inputs', fakeAsync(() => {
      fixture.componentRef.setInput('style', MonkeyStyle.SECONDARY);
      fixture.componentRef.setInput('flat', '');
      fixture.componentRef.setInput('sticky', '');
      fixture.detectChanges();
      tick(CHANGES_DELAY);

      const classList = fixture.componentInstance.classList;
      expect(classList).toContain('style-secondary');
      expect(classList).toContain('type-flat');
      expect(classList).toContain('position-sticky');
      expect(classList).toContain(fixture.componentInstance.currentScreen.sizeStyleClass);
    }));

    it('recalculates classList after an input change', fakeAsync(() => {
      fixture.detectChanges();
      tick(CHANGES_DELAY);

      fixture.componentRef.setInput('style', MonkeyStyle.DANGER);
      fixture.detectChanges();
      tick(CHANGES_DELAY);

      expect(fixture.componentInstance.classList).toContain('style-danger');
      expect(fixture.componentInstance.classList).not.toContain('style-primary');
    }));

    it('isDisabledComponent returns to false when the component is enabled again', fakeAsync(() => {
      fixture.componentRef.setInput('disabled', 'true');
      fixture.detectChanges();
      tick(CHANGES_DELAY);
      expect(fixture.componentInstance.isDisabledComponent).toBeTrue();

      fixture.componentRef.setInput('disabled', 'false');
      fixture.detectChanges();
      tick(CHANGES_DELAY);

      expect(fixture.componentInstance.isDisabledComponent).toBeFalse();
      expect(fixture.componentInstance.classList).not.toContain('disabled');
    }));

    xit('E-02: keeps one subscription to the screen changes after several input changes', fakeAsync(() => {
      const addEventListener = spyOn(window, 'addEventListener').and.callThrough();

      fixture.detectChanges();
      [MonkeyStyle.SECONDARY, MonkeyStyle.TERTIARY, MonkeyStyle.DANGER].forEach((style) => {
        fixture.componentRef.setInput('style', style);
        fixture.detectChanges();
      });
      tick(CHANGES_DELAY);

      const resizeListeners = addEventListener.calls
        .allArgs()
        .filter(([type]) => type === 'resize').length;
      expect(resizeListeners).toBeLessThanOrEqual(1);
    }));

    xit('E-03: does not remove the classes of the <main> element', fakeAsync(() => {
      const main = document.createElement('main');
      main.className = 'app-main';
      document.body.appendChild(main);

      try {
        fixture.detectChanges();
        tick(CHANGES_DELAY);

        expect(main.classList).toContain('app-main');
      } finally {
        main.remove();
      }
    }));
  });

  describe('through MonkeyLoader', () => {
    xit('E-05: keeps the size class after an input change and after a resize', fakeAsync(() => {
      const fixture = TestBed.createComponent(MonkeyLoader);
      fixture.componentRef.setInput('lg', '');
      fixture.detectChanges();
      tick(CHANGES_DELAY);

      expect(fixture.componentInstance.classList).toContain('size-lg');

      window.dispatchEvent(new Event('resize'));

      expect(fixture.componentInstance.classList).toContain('size-lg');
    }));
  });
});
