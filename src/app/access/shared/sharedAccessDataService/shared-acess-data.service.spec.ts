import { TestBed } from '@angular/core/testing';

import { SharedAcessDataService } from './shared-acess-data.service';

describe('SharedAcessDataService', () => {
  let service: SharedAcessDataService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SharedAcessDataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
