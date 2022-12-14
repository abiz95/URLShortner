import { TestBed } from '@angular/core/testing';

import { GeneralUrlService } from './general-url.service';

describe('GeneralUrlService', () => {
  let service: GeneralUrlService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GeneralUrlService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
