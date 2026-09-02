import { Component } from '@angular/core';
import { LivingForm } from '../selected-step.models';
import { form, FormField, max, min, required } from '@angular/forms/signals';
import { StepBase } from '../step-base.directive';

@Component({
  selector: 'app-stap-3',
  templateUrl: './stap-3.component.html',
  imports: [FormField],
})
export class Stap3Component extends StepBase<LivingForm> {
  protected readonly form = form<LivingForm>(this.data, (schemaPath) => {
    required(schemaPath.debt, { message: 'Lachkat' });
    min(schemaPath.debt, 0, { message: 'Lachkat' });
    max(schemaPath.debt, 1000000, { message: 'Lachkat' });
    required(schemaPath.savings, { message: 'Lachkat' });
    min(schemaPath.savings, 0, { message: 'Lachkat' });
    max(schemaPath.savings, 1000000, { message: 'Lachkat' });
  });
}
