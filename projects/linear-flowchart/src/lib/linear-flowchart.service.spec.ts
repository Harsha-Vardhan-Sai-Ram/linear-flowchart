import { TestBed } from '@angular/core/testing';

import { LinearFlowchartService } from './linear-flowchart.service';

describe('LinearFlowchartService', () => {
  let service: LinearFlowchartService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LinearFlowchartService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
