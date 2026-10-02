import { TestBed, fakeAsync, tick } from '@angular/core/testing';

import { MonkeyAlertService } from './alert.service';
import { Message } from '../objects/classes/message-data.class';
import { MonkeyStyle } from '../objects/enums/style.enum';

describe('MonkeyAlertService', () => {
  let service: MonkeyAlertService;
  let messages: Message[];

  beforeEach(() => {
    service = TestBed.inject(MonkeyAlertService);
    messages = [];
    service.event.subscribe((message) => messages.push(message));
  });

  it('emits one message with the correct style for each single method', () => {
    service.warning('w', false, 'Warning');
    service.danger('d', false);
    service.success('s', false);
    service.info('i', false);
    service.custom('c', MonkeyStyle.TERTIARY, false, 'Custom', 'star');

    expect(messages.map((message) => message.style)).toEqual([
      MonkeyStyle.WARNING,
      MonkeyStyle.DANGER,
      MonkeyStyle.SUCCESS,
      MonkeyStyle.INFO,
      MonkeyStyle.TERTIARY,
    ]);
    expect(messages.map((message) => message.texts)).toEqual([['w'], ['d'], ['s'], ['i'], ['c']]);
    expect(messages[0].title).toBe('Warning');
    expect(messages[4].icon).toBe('star');
  });

  it('emits the list of messages for each plural method', () => {
    const texts = ['first', 'second'];

    service.warnings(texts, false);
    service.dangers(texts, false);
    service.successes(texts, false);
    service.infos(texts, false);
    service.customs(texts, MonkeyStyle.SECONDARY, false);

    expect(messages.length).toBe(5);
    messages.forEach((message) => expect(message.texts).toEqual(texts));
  });

  it('hide() emits an empty message', () => {
    service.hide();

    expect(messages.length).toBe(1);
    expect(messages[0].texts).toEqual([]);
  });

  it('closes the alert automatically after the screen time', fakeAsync(() => {
    service.info('auto', true);

    tick(4999);
    expect(messages.length).toBe(1);

    tick(1);
    expect(messages.length).toBe(2);
    expect(messages[1].texts).toEqual([]);
  }));

  it('does not close the alert when it is not auto-close', fakeAsync(() => {
    service.info('manual', false);

    tick(10000);

    expect(messages.length).toBe(1);
  }));
});
