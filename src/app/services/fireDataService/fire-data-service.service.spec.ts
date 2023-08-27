import { TestBed } from '@angular/core/testing';

import { FireDataServiceService } from './fire-data-service.service';

describe('FireDataServiceService', () => {
  let service: FireDataServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FireDataServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
