import { CurrencyPipe } from '@angular/common';
import { registerLocaleData } from '@angular/common';
import localeNl from '@angular/common/locales/nl';
import { Component, inject, input, LOCALE_ID, OnChanges, SimpleChanges } from '@angular/core';
import { MortgageCalculation } from '../mortgage-calculation';
import { CalculationService } from './calculation.service';

registerLocaleData(localeNl);

@Component({
  selector: 'app-calculation',
  templateUrl: './calculation.component.html',
  styleUrls: ['./calculation.component.scss'],
  imports: [CurrencyPipe],
  providers: [{ provide: LOCALE_ID, useValue: 'nl-NL' }],
})
export class CalculationComponent implements OnChanges {
  private readonly calculationService: CalculationService = inject(CalculationService);

  public readonly formData = input.required<MortgageCalculation>();

  protected maxMortgage = 0;
  protected monthlyCosts = 0;
  protected ownContribution = 0;
  protected transferTax = 0;

  ngOnChanges(changes: SimpleChanges<CalculationComponent>) {
    const formDataChanges = changes.formData?.currentValue !== changes.formData?.previousValue;
    if (formDataChanges) {
      this.setMortgageProperties();
    }
  }

  private setMortgageProperties(): void {
    const totalIncome = this.formData().brutoInkomen + (this.formData().brutoInkomenPartner ?? 0);
    const maxMortgage = this.calculationService.calculateMaxMortgage(totalIncome);
    this.maxMortgage = maxMortgage;
    this.monthlyCosts = this.calculationService.monthlyCosts(maxMortgage);
    this.ownContribution = this.calculationService.ownContribution(maxMortgage);
    this.transferTax = this.calculationService.transferTax(maxMortgage);
  }
}
