import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class CalculationService {
  monthlyCosts(maxMortgage: number): number {
    const x1 = 120000;
    const y1 = 580;

    const x2 = 200000;
    const y2 = 960;

    const m = (y2 - y1) / (x2 - x1);
    const b = y1 - m * x1;

    const uitvoerwaarde = m * maxMortgage + b;

    return Math.round(uitvoerwaarde);
  }

  transferTax(maxMortgage: number): number {
    return Math.floor(maxMortgage * 0.02);
  }

  ownContribution(maxMortgage: number): number {
    return Math.floor(maxMortgage * 0.1);
  }

  calculateMaxMortgage(brutoIncome: number): number {
    const slope = 0.000011;
    const intercept = 3.7;

    const interestRate = slope * brutoIncome + intercept;
    const roundInterestRate = Math.min(interestRate);

    return Math.round(brutoIncome * roundInterestRate);
  }
}
