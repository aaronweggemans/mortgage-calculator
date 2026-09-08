import { Component, effect, ElementRef, viewChild } from '@angular/core';
import { form, FormField, max, min, required } from '@angular/forms/signals';
import { IncomeAndPartnerForm } from '../selected-step.models';
import { StepBase } from '../step-base.directive';

@Component({
  selector: 'app-stap-2',
  templateUrl: './stap-2.component.html',
  imports: [FormField],
})
export class Stap2Component extends StepBase<IncomeAndPartnerForm> {
  private readonly partnerIncomeInputField =
    viewChild<ElementRef<HTMLInputElement>>('partnerIncome');

  private readonly focusOnInputPartnerWhenInputIsShown = effect(() => {
    if (this.form.partner().value() && this.partnerIncomeInputField()) {
      this.partnerIncomeInputField()!.nativeElement.focus();
    }
  });

  protected readonly form = form<IncomeAndPartnerForm>(this.data, (schemaPath) => {
    required(schemaPath.income, { message: 'Vul uw bruto jaarinkomen inkomen in.' });
    min(schemaPath.income, 0, {
      message: 'U kunt geen negatief getal invullen als inkomen voor uw partner.',
    });
    max(schemaPath.income, 100000000, {
      message: 'Het inkomen van uw partner is te hoog. Vul een lager getal in.',
    });
    required(schemaPath.incomePartner, {
      message: 'Vul een bruto jaarinkomen voor uw partner in.',
      when: ({ valueOf }) => valueOf(schemaPath.partner) ?? false,
    });
    min(schemaPath.incomePartner, 0, {
      message: 'Het inkomen van uw partner kan niet negatief zijn.',
      when: ({ valueOf }) => valueOf(schemaPath.partner) ?? false,
    });
    max(schemaPath.incomePartner, 100000000, {
      message: 'Het inkomen van uw partner is te hoog. Vul een lager getal in.',
      when: ({ valueOf }) => valueOf(schemaPath.partner) ?? false,
    });
  });
}
