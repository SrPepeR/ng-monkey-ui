import { TestBed } from '@angular/core/testing';

import { ThemeService } from './theme.service';

describe('ThemeService', () => {
  let storedTheme: string | null;
  let systemPrefersDark: boolean;
  let systemListener: ((event: { matches: boolean }) => void) | undefined;

  const createService = () => TestBed.inject(ThemeService);

  beforeEach(() => {
    storedTheme = null;
    systemPrefersDark = false;
    systemListener = undefined;

    spyOn(Storage.prototype, 'getItem').and.callFake((key: string) =>
      key === 'theme' ? storedTheme : null,
    );
    spyOn(Storage.prototype, 'setItem');
    spyOn(window, 'matchMedia').and.callFake(
      (query: string) =>
        ({
          matches: systemPrefersDark,
          media: query,
          addEventListener: (_type: string, listener: (event: { matches: boolean }) => void) =>
            (systemListener = listener),
          addListener: (listener: (event: { matches: boolean }) => void) =>
            (systemListener = listener),
          removeEventListener: () => undefined,
          removeListener: () => undefined,
        }) as unknown as MediaQueryList,
    );
  });

  it('uses the theme stored in localStorage', () => {
    storedTheme = 'light';
    systemPrefersDark = true;

    expect(createService().isDarkMode).toBeFalse();
  });

  it('uses prefers-color-scheme when no theme is stored', () => {
    systemPrefersDark = true;

    expect(createService().isDarkMode).toBeTrue();
  });

  it('toggleDarkMode() emits the new value and updates isDarkMode and isLightMode', () => {
    const service = createService();
    const emitted: boolean[] = [];
    service.isDarkMode$.subscribe((isDark) => emitted.push(isDark));

    service.toggleDarkMode();

    expect(emitted).toEqual([false, true]);
    expect(service.isDarkMode).toBeTrue();
    expect(service.isLightMode).toBeFalse();
  });

  it('E-11: stores the choice in localStorage', () => {
    const service = createService();

    service.toggleDarkMode();

    expect(Storage.prototype.setItem).toHaveBeenCalledWith('theme', 'dark');
  });

  it('E-11: follows the changes of prefers-color-scheme when the user did not choose', () => {
    const service = createService();

    systemListener?.({ matches: true });

    expect(service.isDarkMode).toBeTrue();
  });

  it('ignores the changes of prefers-color-scheme once the user chose', () => {
    storedTheme = 'light';
    const service = createService();

    systemListener?.({ matches: true });

    expect(service.isDarkMode).toBeFalse();
  });
});
