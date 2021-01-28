import { TestBed } from '@angular/core/testing';

import { NavigatorServicesService } from './navigator-services.service';

describe('NavigatorServicesService', () => {
  let service: NavigatorServicesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NavigatorServicesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
