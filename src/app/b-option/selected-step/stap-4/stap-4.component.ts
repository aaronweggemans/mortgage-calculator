import {
  Component,
  computed,
  effect,
  ElementRef,
  inject,
  input,
  output,
  viewChild,
} from '@angular/core';
import { CardComponent } from './card/card.component';
import { MortgageCalculationService } from '../../../shared/mortgage-calculation.service';
import { CurrencyPipe } from '@angular/common';

@Component({
  selector: 'app-stap-4',
  templateUrl: './stap-4.component.html',
  imports: [CardComponent, CurrencyPipe],
})
export class Stap4Component {
  private readonly calculationService = inject(MortgageCalculationService);

  private readonly calculateAgainButton =
    viewChild.required<ElementRef<HTMLButtonElement>>('calculateAgainButton');

  private readonly forceFocusOnCalculateAgainButton = effect(() => {
    if (this.calculateAgainButton()) {
      this.calculateAgainButton()!.nativeElement.focus();
    }
  });

  public readonly income = input.required<number>();
  public readonly partnerIncome = input.required<number>();
  public readonly resetFlow = output<void>();

  protected readonly totalIncome = computed(() => {
    return this.income() + this.partnerIncome();
  });

  protected readonly maxMortgage = computed(() => {
    return this.calculationService.calculateMaxMortgage(this.totalIncome());
  });

  protected readonly monthlyCosts = computed(() => {
    return this.calculationService.monthlyCosts(this.maxMortgage());
  });

  protected readonly ownContribution = computed(() => {
    return this.calculationService.ownContribution(this.maxMortgage());
  });

  protected readonly transferTax = computed(() => {
    return this.calculationService.transferTax(this.maxMortgage());
  });

  protected navigate(): void {
    window.location.href = window.location.hostname + '/contact';
  }
}
