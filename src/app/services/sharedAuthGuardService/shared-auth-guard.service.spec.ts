import { TestBed } from '@angular/core/testing';

import { SharedAuthGuardService } from './shared-auth-guard.service';

describe('SharedAuthGuardService', () => {
  let service: SharedAuthGuardService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SharedAuthGuardService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
