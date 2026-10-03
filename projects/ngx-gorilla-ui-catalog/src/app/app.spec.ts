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
    const nav = element.querySelector('nav[aria-label="Documentation"]');
    expect(nav?.textContent).toContain('Getting started');
  });
});
