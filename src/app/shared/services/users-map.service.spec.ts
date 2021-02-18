import { TestBed } from '@angular/core/testing';

import { UsersMapService } from './users-map.service';

describe('UsersMapService', () => {
  let service: UsersMapService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UsersMapService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
