import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject, combineLatest, map } from 'rxjs';
import { Calculation } from '../interfaces/calculation';
import { MortgageFormData } from '../interfaces/mortgage-form-data';

@Injectable({
  providedIn: 'root',
})
export class CalculateMortgageService {
  private _totalBrutoIncome$ = new BehaviorSubject(30000);

  private _formData$: Subject<Partial<MortgageFormData>> = new Subject();
  formData$: Observable<Partial<MortgageFormData>> =
    this._formData$.asObservable();

  calculations: Observable<Calculation> = combineLatest(
    [
      this._toOwnContribution(),
      this._totalBrutoIncome$
        .asObservable()
        .pipe(map(this._calculateMaxMortgage)),
      this._totalBrutoIncome$.asObservable(),
    ].map((observable) => observable.pipe(map(this._roundByThirdNumber)))
  ).pipe(
    map(([ownContribution, maxMortgage, totalBrutoIncome]) => ({
      ownContribution,
      maxMortgage,
      totalBrutoIncome,
    }))
  );

  constructor() {}

  setTotaleBrutoIncome(brutoIncome: number): void {
    this._totalBrutoIncome$.next(brutoIncome);
  }

  setFormData(formData: Partial<MortgageFormData>): void {
    this._formData$.next(formData);
  }

  private _toOwnContribution(): Observable<number> {
    return this._totalBrutoIncome$
      .asObservable()
      .pipe(
        map(this._calculateMaxMortgage),
        map(this._calculateOwnContribution)
      );
  }

  private _calculateOwnContribution(maxMortgage: number): number {
    return Math.floor(maxMortgage * 0.1);
  }

  private _calculateMaxMortgage(nettoIncome: number): number {
    const slope = 0.000011; // Verander dit naar de gewenste helling
    const intercept = 3.7; // Verander dit naar de gewenste y-intercept

    // Lineaire benadering: rentepercentage = helling * nettobedrag + y-intercept
    const interestRate = slope * nettoIncome + intercept;
    const roundInterestRate = Math.min(interestRate);

    return Math.round(nettoIncome * roundInterestRate);
  }

  /**
   * By every third number, this function will add a dot.
   * @param number
   * @returns string
   */
  private _roundByThirdNumber(number: number): string {
    return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.');
  }
}
