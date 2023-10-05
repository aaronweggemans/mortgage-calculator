import { Component } from '@angular/core';
import { CalculateMortgageService } from '../shared/services/calculate-mortgage.service';
import { Observable } from 'rxjs';
import { Calculation } from '../shared/interfaces/calculation';
import { MortgageFormData } from '../shared/interfaces/mortgage-form-data';

@Component({
  selector: 'app-calculation',
  templateUrl: './calculation.component.html',
  styleUrls: ['./calculation.component.scss'],
})
export class CalculationComponent {
  calculations: Observable<Calculation> =
    this.calculateMortgageService.calculations;

  formData: Observable<Partial<MortgageFormData>> =
    this.calculateMortgageService.formData$;

  constructor(private calculateMortgageService: CalculateMortgageService) {}
}
