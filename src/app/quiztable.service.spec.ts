import { TestBed } from '@angular/core/testing';

import { QuiztableService } from './quiztable.service';

describe('QuiztableService', () => {
  let service: QuiztableService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(QuiztableService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
