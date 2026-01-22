import { CurrencyPipe } from '@angular/common';
import { registerLocaleData } from '@angular/common';
import localeNl from '@angular/common/locales/nl';
import { Component, computed, inject, input, InputSignal, LOCALE_ID, Signal } from '@angular/core';
import { MortgageCalculation } from '../mortgage-calculation';
import { CalculationService } from './calculation.service';

registerLocaleData(localeNl);

@Component({
  selector: 'app-calculation',
  templateUrl: './calculation.component.html',
  imports: [CurrencyPipe],
  providers: [{ provide: LOCALE_ID, useValue: 'nl-NL' }],
})
export class CalculationComponent {
  private readonly calculationService: CalculationService = inject(CalculationService);

  public readonly formData: InputSignal<MortgageCalculation> =
    input.required<MortgageCalculation>();

  protected readonly totalIncome: Signal<number> = computed(() => {
    return this.formData().brutoInkomen + (this.formData().brutoInkomenPartner ?? 0);
  });

  protected readonly maxMortgage: Signal<number> = computed(() => {
    return this.calculationService.calculateMaxMortgage(this.totalIncome());
  });

  protected readonly monthlyCosts: Signal<number> = computed(() => {
    return this.calculationService.monthlyCosts(this.maxMortgage());
  });

  protected readonly ownContribution: Signal<number> = computed(() => {
    return this.calculationService.ownContribution(this.maxMortgage());
  });

  protected readonly transferTax: Signal<number> = computed(() => {
    return this.calculationService.transferTax(this.maxMortgage());
  });
}
