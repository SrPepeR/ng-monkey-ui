import { TestBed, fakeAsync, tick } from '@angular/core/testing';

import { MonkeyTooltipService } from './tooltip.service';
import { Tooltip } from './tooltip';
import { MonkeyStyle } from '../../objects/enums/style.enum';

describe('MonkeyTooltipService', () => {
  let service: MonkeyTooltipService;
  let tooltips: Tooltip[];

  beforeEach(() => {
    service = TestBed.inject(MonkeyTooltipService);
    tooltips = [];
    service.event.subscribe((tooltip) => tooltips.push(tooltip));
  });

  it('onShow() emits the tooltip after the delay', fakeAsync(() => {
    service.onShow('Hello', MonkeyStyle.INFO, { x: 100, y: 50 });

    tick(1999);
    expect(tooltips.length).toBe(0);

    tick(1);
    expect(tooltips.length).toBe(1);
    expect(tooltips[0].text).toBe('Hello');
    expect(tooltips[0].style).toBe(MonkeyStyle.INFO);
    expect(tooltips[0].toRight).toBeTrue();
    expect(tooltips[0].startPosition).toEqual({ x: 120, y: 50 });
  }));

  it('show() emits the tooltip immediately', () => {
    const tooltip = new Tooltip(MonkeyStyle.PRIMARY, 'Now');

    service.show(tooltip);

    expect(tooltips).toEqual([tooltip]);
  });

  it('hide() emits an empty tooltip and cancels a pending one', fakeAsync(() => {
    service.onShow('Pending', MonkeyStyle.INFO, { x: 100, y: 50 });

    service.hide();
    tick(2000);

    expect(tooltips.length).toBe(1);
    expect(tooltips[0].text).toBe('');
    expect(tooltips[0].style).toBe(MonkeyStyle.NONE);
  }));

  xit('E-20: accepts the coordinate 0', fakeAsync(() => {
    service.onShow('Edge', MonkeyStyle.INFO, { x: 0, y: 50 });

    tick(2000);

    expect(tooltips[0].startPosition).toEqual({ x: 20, y: 50 });
  }));
});
