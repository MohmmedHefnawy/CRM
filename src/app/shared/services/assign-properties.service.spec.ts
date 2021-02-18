import { TestBed } from '@angular/core/testing';

import { AssignPropertiesService } from './assign-properties.service';

describe('AssignPropertiesService', () => {
  let service: AssignPropertiesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AssignPropertiesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
