import { Component, inject } from '@angular/core';
import { CalculateMortgageService } from '../shared/services/calculate-mortgage.service';
import { Observable } from 'rxjs';
import { FullCalculation } from '../shared/interfaces/full-calculation';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'app-calculation',
  templateUrl: './calculation.component.html',
  styleUrls: ['./calculation.component.scss'],
  imports: [AsyncPipe],
})
export class CalculationComponent {
  private calculateMortgageService = inject(CalculateMortgageService);

  data$: Observable<FullCalculation> = this.calculateMortgageService.data$;

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
