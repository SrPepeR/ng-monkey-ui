import { TestBed } from '@angular/core/testing';

import { MonkeyBackgroundService } from './background.service';

describe('MonkeyBackgroundService', () => {
  let service: MonkeyBackgroundService;

  const style = (id: string) => document.getElementById(id);

  const removeAddedStyles = () => {
    style('monkey-background')?.remove();
    style('monkey-background-animation')?.remove();
  };

  beforeEach(() => {
    removeAddedStyles();
    service = TestBed.inject(MonkeyBackgroundService);
  });

  afterEach(() => removeAddedStyles());

  it('generated colors always have six hex digits', () => {
    // 0x0000a7: a value below 0x100000, which used to give a 5-digit (or shorter) color.
    spyOn(Math, 'random').and.returnValue(0.00001);

    service.addRandomGradient();

    expect(service.gradient.colors.get()[0]).toBe('#0000a7');
  });

  it('animate() includes the last frame', () => {
    service.addGradient('#ff0000', 50, { x: 50, y: 50 });

    service.animate(10);

    const keyframes = style('monkey-background-animation')!.innerHTML.match(/\d+% \{/g)!;
    expect(keyframes.map((keyframe) => keyframe.split('%')[0])).toEqual([
      '0',
      '10',
      '20',
      '30',
      '40',
      '50',
      '60',
      '70',
      '80',
      '90',
      '100',
    ]);
  });

  it('keeps positions and sizes between 0 and 100', () => {
    service.addGradient('#ff0000', 0, { x: 0, y: 100 });
    service.addGradient('#00ff00', 100, { x: 100, y: 0 });

    for (let i = 0; i < 100; i++) {
      service.gradient.move();
      service.gradient.growShrink();
    }

    service.gradient.gradientPositions.get().forEach(({ x, y }) => {
      expect(x).toBeGreaterThanOrEqual(0);
      expect(x).toBeLessThanOrEqual(100);
      expect(y).toBeGreaterThanOrEqual(0);
      expect(y).toBeLessThanOrEqual(100);
    });
    service.gradient.gradientSizes.get().forEach((size) => {
      expect(size).toBeGreaterThanOrEqual(0);
      expect(size).toBeLessThanOrEqual(100);
    });
  });

  it('remove() also stops the animation', () => {
    service.addRandomGradients(2).apply().animate();

    service.remove();

    expect(style('monkey-background')).toBeNull();
    expect(style('monkey-background-animation')).toBeNull();
  });
});
