import {
  Component,
  effect,
  ElementRef,
  output,
  signal,
  viewChild,
  ViewEncapsulation,
} from '@angular/core';
import { MatIcon } from '@angular/material/icon';

@Component({
  selector: 'app-stap-2',
  imports: [MatIcon],
  templateUrl: './stap-2.component.html',
  encapsulation: ViewEncapsulation.None,
})
export class Stap2Component {
  public readonly next = output<void>();
  public readonly previous = output<void>();

  private readonly partnerIncomeInputField =
    viewChild<ElementRef<HTMLInputElement>>('partnerIncome');

  protected readonly hasPartner = signal<boolean | null>(null);

  private readonly focusIncomePartnerField = effect(() => {
    if (this.hasPartner() && this.partnerIncomeInputField()) {
      this.partnerIncomeInputField()!.nativeElement.focus();
    }
  });
}
