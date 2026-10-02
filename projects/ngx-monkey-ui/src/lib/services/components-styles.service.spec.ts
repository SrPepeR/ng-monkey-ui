import { TestBed } from '@angular/core/testing';

import { ComponentsStylesService } from './components-styles.service';

describe('ComponentsStylesService', () => {
  let service: ComponentsStylesService;

  beforeEach(() => {
    service = TestBed.inject(ComponentsStylesService);
  });

  it('generates the color class from style', () => {
    expect(service.generateClassList({ style: 'danger' })).toContain('style-danger');
  });

  it('adds the variant class', () => {
    const variants: [string, string][] = [
      ['brutalist', 'type-brutalist'],
      ['flat', 'type-flat'],
      ['ghost', 'type-ghost'],
      ['glass', 'type-glassmorphism'],
      ['glow', 'type-glow'],
      ['discreet', 'type-discreet'],
    ];

    variants.forEach(([input, expectedClass]) => {
      expect(service.generateClassList({ [input]: '' }))
        .withContext(input)
        .toContain(expectedClass);
    });
    expect(service.generateClassList({})).toContain('type-default');
  });

  it('adds the general style classes', () => {
    const classList = service.generateClassList({
      noPadding: 'true',
      squared: '',
      alignCenter: true,
      contrast: '',
    });

    expect(classList).toContain('no-padding');
    expect(classList).toContain('squared-item');
    expect(classList).toContain('align-center');
    expect(classList).toContain('contrast');
    expect(classList).not.toContain('no-margin');
  });

  xit('E-04: does not duplicate classes', () => {
    const classList = service.generateClassList({ style: 'primary', flat: '', noPadding: '' });

    expect(classList.length).toBe(new Set(classList).size);
  });
});
