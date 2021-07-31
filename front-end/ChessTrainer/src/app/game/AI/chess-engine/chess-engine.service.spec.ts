import { TestBed } from '@angular/core/testing';

import { ChessEngineService } from './chess-engine.service';

describe('ChessEngineService', () => {
  let service: ChessEngineService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ChessEngineService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
