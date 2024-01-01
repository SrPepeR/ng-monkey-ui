import { TestBed } from '@angular/core/testing';

import { ComponentsStylesService } from './components-styles.service';

describe('ComponentsStylesService', () => {
  let service: ComponentsStylesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ComponentsStylesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
