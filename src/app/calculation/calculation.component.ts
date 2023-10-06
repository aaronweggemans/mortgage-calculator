import { Component } from '@angular/core';
import { CalculateMortgageService } from '../shared/services/calculate-mortgage.service';
import { Observable } from 'rxjs';
import { FullCalculation } from '../shared/interfaces/full-calculation';

@Component({
  selector: 'app-calculation',
  templateUrl: './calculation.component.html',
  styleUrls: ['./calculation.component.scss'],
})
export class CalculationComponent {
  data$: Observable<FullCalculation> = this.calculateMortgageService.data$;

  constructor(private calculateMortgageService: CalculateMortgageService) {}

  /**
   * By every third number, this function will add a dot.
   * @param number
   * @returns string
   */
  _roundByThirdNumber(number: number | undefined | null): string {
    if (!number) return '';
    return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.');
  }
}
