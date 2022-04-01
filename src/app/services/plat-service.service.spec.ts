import { TestBed } from '@angular/core/testing';

import { PlatService } from './plat-service.service';

describe('PlatService', () => {
  let service: PlatService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PlatService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
