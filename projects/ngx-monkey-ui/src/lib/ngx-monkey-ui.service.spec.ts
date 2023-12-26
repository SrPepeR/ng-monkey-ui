import { TestBed } from '@angular/core/testing';

import { NgxMonkeyUiService } from './ngx-monkey-ui.service';

describe('NgxMonkeyUiService', () => {
  let service: NgxMonkeyUiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NgxMonkeyUiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
