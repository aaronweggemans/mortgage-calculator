import { TestBed } from '@angular/core/testing';
import { describe, beforeEach, it, expect } from 'vitest';
import { CalculationService } from './calculation.service';

describe('CalculateMortgageService', () => {
  let service: CalculationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CalculationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
