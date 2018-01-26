import { TestBed, inject } from '@angular/core/testing';

import { GraphNodeService } from './graph-node.service';

describe('GraphNodeService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [GraphNodeService]
    });
  });

  it('should be created', inject([GraphNodeService], (service: GraphNodeService) => {
    expect(service).toBeTruthy();
  }));
});
