import { TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { App } from './app';
import { routes } from './app.routes';

describe('App', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [App],
      providers: [provideRouter(routes)],
    });
  });

  it('boots without zone.js', () => {
    expect(typeof (globalThis as { Zone?: unknown }).Zone).toBe('undefined');
  });

  it('renders the skip link and the documentation navigation', async () => {
    const fixture = TestBed.createComponent(App);
    await fixture.whenStable();
    const element = fixture.nativeElement as HTMLElement;

    expect(element.querySelector('a.skip-link')?.getAttribute('href')).toBe('#main');
    const links = Array.from(
      element.querySelectorAll('nav[aria-label="Documentation"] a'),
      (link) => link.textContent?.trim(),
    );
    expect(links).toEqual(['Getting started', 'Theming', 'Tokens']);
  });

  it('renders the theme switcher with the light, dark and system options', async () => {
    const fixture = TestBed.createComponent(App);
    await fixture.whenStable();
    const element = fixture.nativeElement as HTMLElement;

    const options = Array.from(
      element.querySelectorAll<HTMLInputElement>('gorilla-theme-switcher input[type="radio"]'),
      (input) => input.value,
    );
    expect(options).toEqual(['light', 'dark', 'system']);
  });
});
