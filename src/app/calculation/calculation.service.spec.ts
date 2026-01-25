import { describe, beforeEach, it, expect } from 'vitest';
import { CalculationService } from './calculation.service';
import { createServiceFactory, SpectatorService } from '@ngneat/spectator/vitest';

describe('CalculateMortgageService', () => {
  let spectator: SpectatorService<CalculationService>;

  const createService = createServiceFactory({
    service: CalculationService,
  });

  beforeEach(() => {
    spectator = createService();
  });

  it('should create', () => {
    expect(spectator.service).toBeTruthy();
  });

  it.each([
    { grossAnnualIncome: 1, expectation: 4 },
    { grossAnnualIncome: 15000, expectation: 57975 },
    { grossAnnualIncome: 30000, expectation: 120900 },
    { grossAnnualIncome: 62500, expectation: 274219 },
    { grossAnnualIncome: 128500, expectation: 657085 },
    { grossAnnualIncome: 238950, expectation: 1512183 },
  ])(
    'should be able to use the service to calculate a valid mortgage',
    ({ grossAnnualIncome, expectation }) => {
      const calculation = spectator.service.calculateMaxMortgage(grossAnnualIncome);
      expect(calculation).toBe(expectation);
    },
  );

  it.each([
    { maxMortgage: 4, expectation: 10 },
    { maxMortgage: 57975, expectation: 285 },
    { maxMortgage: 120900, expectation: 584 },
    { maxMortgage: 274219, expectation: 1313 },
    { maxMortgage: 657085, expectation: 3131 },
    { maxMortgage: 1512183, expectation: 7193 },
  ])(
    'should be able to use the service to calculate the valid monthly costs on the gross annual income',
    ({ maxMortgage, expectation }) => {
      const calculation = spectator.service.monthlyCosts(maxMortgage);
      expect(calculation).toBe(expectation);
    },
  );

  it('should be able to calculate the transfer tax which is two percent of a mortgage', () => {
    const calculation = spectator.service.transferTax(240000);
    expect(calculation).toBe(4800);
  });

  it('should be able to calculate the your own contribution which is arround 10 percent of the total mortgage', () => {
    const calculation = spectator.service.monthlyCosts(240000);
    expect(calculation).toBe(1150);
  });
});
