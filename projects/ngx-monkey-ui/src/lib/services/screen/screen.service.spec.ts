import { TestBed } from '@angular/core/testing';

import { MonkeyScreenService } from './screen.service';

describe('MonkeyScreenService', () => {
  let service: MonkeyScreenService;

  beforeEach(() => {
    service = TestBed.inject(MonkeyScreenService);
  });

  it('unlockOrientation() resolves after unlocking', async () => {
    const unlock = spyOn(screen.orientation, 'unlock');

    await expectAsync(service.unlockOrientation()).toBeResolved();
    expect(unlock).toHaveBeenCalledTimes(1);
  });

  it('unlockOrientation() rejects when unlock() throws', async () => {
    const error = new DOMException('Not supported', 'NotSupportedError');
    spyOn(screen.orientation, 'unlock').and.throwError(error);

    await expectAsync(service.unlockOrientation()).toBeRejectedWith(error);
  });
});
