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

  private readonly indicationMortgage =
    viewChild.required<ElementRef<HTMLDivElement>>('indicationMortgage');

  private readonly forceFocusOnTheMortgage = effect(() => {
    if (this.indicationMortgage()) {
      this.indicationMortgage()!.nativeElement.focus();
    }
  });

  readonly income = input.required<number>();
  readonly partnerIncome = input.required<number>();
  readonly dateOfBirth = input.required<Date>();
  readonly previousHouse = input.required<boolean>();

  readonly resetFlow = output<void>();

  protected readonly shouldPayTransferTax = computed(() => {
    return new Date().getFullYear() - this.dateOfBirth().getFullYear() > 35 || this.previousHouse();
  });

  protected readonly totalIncome = computed(() => {
    return this.income() + this.partnerIncome();
  });

  protected readonly maxMortgage = computed(() => {
    return this.calculationService.calculateMaxMortgage(this.totalIncome());
  });

  protected readonly monthlyCosts = computed(() => {
    return this.calculationService.monthlyCosts(this.maxMortgage());
  });

  protected readonly transferTax = computed(() => {
    return this.calculationService.transferTax(this.maxMortgage());
  });
}
