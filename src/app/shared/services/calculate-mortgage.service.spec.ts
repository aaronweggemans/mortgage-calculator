import { TestBed } from '@angular/core/testing';

import { CalculateMortgageService } from './calculate-mortgage.service';

describe('CalculateMortgageService', () => {
  let service: CalculateMortgageService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CalculateMortgageService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
