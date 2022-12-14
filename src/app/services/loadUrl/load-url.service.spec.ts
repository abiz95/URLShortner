import { TestBed } from '@angular/core/testing';

import { LoadUrlService } from './load-url.service';

describe('LoadUrlService', () => {
  let service: LoadUrlService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LoadUrlService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
