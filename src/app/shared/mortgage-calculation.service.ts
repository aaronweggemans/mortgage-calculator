import { Service } from '@angular/core';

@Service()
export class MortgageCalculationService {
  /**
   * Calculate the maximum mortgage based on gross annual income (bruto jaarinkomen).
   * @param grossAnnualIncome
   */
  public calculateMaxMortgage(grossAnnualIncome: number): number {
    const slope = 0.000011;
    const intercept = 3.7;

    const interestRate = slope * grossAnnualIncome + intercept;
    const roundInterestRate = Math.min(interestRate);

    return Math.round(grossAnnualIncome * roundInterestRate);
  }

  /**
   * Calculate monthly costs based on maximum mortgage.
   * @param maxMortgage
   */
  public monthlyCosts(maxMortgage: number): number {
    const x1 = 120000;
    const y1 = 580;

    const x2 = 200000;
    const y2 = 960;

    const m = (y2 - y1) / (x2 - x1);
    const b = y1 - m * x1;

    const monthlyCosts = m * maxMortgage + b;
    return Math.round(monthlyCosts);
  }

  /**
   * Calculate transfer tax based on maximum mortgage (overdrachtsbelasting).
   * @param maxMortgage
   */
  public transferTax(maxMortgage: number): number {
    return Math.floor(maxMortgage * 0.02);
  }

  /**
   * Calculate own contribution based on maximum mortgage (eigen inbreng).
   * @param maxMortgage
   */
  public ownContribution(maxMortgage: number): number {
    return Math.floor(maxMortgage * 0.1);
  }
}
