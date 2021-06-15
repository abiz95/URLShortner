import { TestBed } from '@angular/core/testing';

import { PremiumUrlService } from './premium-url.service';

describe('PremiumUrlService', () => {
  let service: PremiumUrlService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PremiumUrlService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
