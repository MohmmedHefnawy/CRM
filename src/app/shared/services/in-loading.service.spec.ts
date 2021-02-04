import { TestBed } from '@angular/core/testing';

import { InLoadingService } from './in-loading.service';

describe('InLoadingService', () => {
  let service: InLoadingService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(InLoadingService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
