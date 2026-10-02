import { TestBed } from '@angular/core/testing';

import { MonkeyFontService } from './font.service';

describe('MonkeyFontService', () => {
  const DOSIS_URL = 'https://fonts.googleapis.com/css2?family=Dosis:wght@200..800&display=swap';
  const CUSTOM_URL = 'data:text/css,/*custom-font*/';

  let service: MonkeyFontService;

  const linksWithHref = (href: string) =>
    Array.from(document.head.querySelectorAll('link')).filter(
      (link) => link.getAttribute('href') === href,
    );

  const removeAddedElements = () => {
    document.head
      .querySelectorAll('[id^="monkey-font-"], link[rel="preconnect"]')
      .forEach((element) => element.remove());
  };

  beforeEach(() => {
    removeAddedElements();
    service = TestBed.inject(MonkeyFontService);
  });

  afterEach(() => removeAddedElements());

  it('adds the Dosis <link> and uses it when the service is created', () => {
    expect(linksWithHref(DOSIS_URL).length).toBe(1);
    expect(document.head.querySelector('style#monkey-font-Dosis')?.innerHTML).toContain('Dosis');
  });

  it('addCustomFont() adds the <link> and useCustomFont() adds the <style>', () => {
    service.addCustomFont(CUSTOM_URL, 'Custom Font');

    expect(linksWithHref(CUSTOM_URL).length).toBe(1);
    expect(document.head.querySelector('style#monkey-font-Custom-Font')).toBeNull();

    service.useCustomFont('Custom Font');

    expect(document.head.querySelector('style#monkey-font-Custom-Font')?.innerHTML).toContain(
      "font-family: 'Custom Font'",
    );
  });

  it('E-16: does not add a second <link> for the same URL', () => {
    service.addCustomFont(CUSTOM_URL, 'Custom Font');
    service.addCustomFont(CUSTOM_URL, 'Custom Font');

    expect(linksWithHref(CUSTOM_URL).length).toBe(1);
  });

  it('E-16: removeDosisFont() removes the <link> and the <style>', () => {
    service.removeDosisFont();

    expect(linksWithHref(DOSIS_URL).length).toBe(0);
    expect(document.head.querySelector('style#monkey-font-Dosis')).toBeNull();
  });

  it('E-16: the <link> and the <style> of a font have different ids', () => {
    expect(document.querySelectorAll('[id="monkey-font-Dosis"]').length).toBe(1);
  });

  it('E-16: using another font removes the <link> of the previous one', () => {
    service.addTitilliumWebFont();

    expect(linksWithHref(DOSIS_URL).length).toBe(0);
  });

  it('E-16: the Red Hat Display URL has display=swap', () => {
    service.addRedHatDisplayFont();

    const redHatLink = Array.from(document.head.querySelectorAll('link')).find((link) =>
      link.href.includes('Red+Hat+Display'),
    );
    expect(redHatLink?.href).toContain('display=swap');
  });
});
