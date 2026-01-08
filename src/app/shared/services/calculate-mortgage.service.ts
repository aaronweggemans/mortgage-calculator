import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject, combineLatest, map } from 'rxjs';
import { MortgageFormData } from '../interfaces/mortgage-form-data';
import { FullCalculation } from '../interfaces/full-calculation';
import { Calculation } from '../interfaces/calculation';

@Injectable({
  providedIn: 'root',
})
export class CalculateMortgageService {
  private _showError$ = new BehaviorSubject(false);
  private _formData$: Subject<Partial<MortgageFormData>> = new Subject();

  private _toFullCalculation = ([showError, formData]: [
    boolean,
    Partial<MortgageFormData>
  ]): FullCalculation => ({
    showError,
    formData,
    calculation: this._toCalculation(formData),
  });

  data$: Observable<FullCalculation> = combineLatest([
    this._showError$.asObservable(),
    this._formData$.asObservable(),
  ]).pipe(map(this._toFullCalculation));

  setFormData(formData: Partial<MortgageFormData>): void {
    this._formData$.next(formData);
  }

  setError(showError: boolean) {
    this._showError$.next(showError);
  }

  private _monthlyCosts(maxMortgage: number) {
    // Formule: uitvoerwaarde = m * invoerwaarde + b
    // waarbij m de helling (slope) is en b de y-afsnede (y-intercept)

    // Punt 1: (120.000, 580)
    const x1 = 120000;
    const y1 = 580;

    // Punt 2: (200.000, 960)
    const x2 = 200000;
    const y2 = 960;

    // Bereken de helling (slope)
    const m = (y2 - y1) / (x2 - x1);
    const b = y1 - m * x1;

    // Bereken de uitvoerwaarde
    const uitvoerwaarde = m * maxMortgage + b;

    return Math.round(uitvoerwaarde);
  }

  private _toCalculation = (
    formData: Partial<MortgageFormData>
  ): Calculation => {
    const totalBrutoIncome = this._calculateFullBrutoIncomes(
      formData.brutoInkomen,
      formData.brutoInkomenPartner
    )!;

    const mortgageCalculation = this._calculateMaxMortgage(totalBrutoIncome)!;

    return {
      totalBrutoIncome,
      mortgageCalculation,
      monthlyCosts: this._monthlyCosts(mortgageCalculation),
      maxMortgage:
        mortgageCalculation +
        (formData.totaalGespaard ? formData.totaalGespaard : 0),
      ownContribution: Math.floor(mortgageCalculation * 0.1),
      transferTax: Math.floor(mortgageCalculation * 0.02),
    };
  };

  private _calculateMaxMortgage(brutoIncome: number): number {
    const slope = 0.000011; // Verander dit naar de gewenste helling
    const intercept = 3.7; // Verander dit naar de gewenste y-intercept

    // Lineaire benadering: rentepercentage = helling * nettobedrag + y-intercept
    const interestRate = slope * brutoIncome + intercept;
    const roundInterestRate = Math.min(interestRate);

    return Math.round(brutoIncome * roundInterestRate);
  }

  private _calculateFullBrutoIncomes(
    brutoIncome: number | null | undefined,
    partnerBrutoIncome: number | null | undefined
  ): number {
    const brutoInkomen: number = brutoIncome ? brutoIncome : 0;
    const brutoInkomenPartner: number =
      partnerBrutoIncome && brutoIncome ? partnerBrutoIncome : 0;

    return brutoInkomen + brutoInkomenPartner;
  }
}
