import { TestBed, inject } from '@angular/core/testing';

import { GraphForceService } from './graph-force.service';

describe('GraphForceService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [GraphForceService]
    });
  });

  it('should be created', inject([GraphForceService], (service: GraphForceService) => {
    expect(service).toBeTruthy();
  }));
});
