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
    required(schemaPath.debt, { message: 'U heeft een foutieve waarde ingevuld.' });
    min(schemaPath.debt, 0, { message: 'U kunt geen negatieve waarde invullen.' });
    max(schemaPath.debt, 1000000, { message: 'U heeft hier een te hoog getal ingevoerd' });
    required(schemaPath.savings, { message: 'U heeft een foutieve waarde ingevuld.' });
    min(schemaPath.savings, 0, { message: 'U kunt geen negatieve waarde invullen.' });
    max(schemaPath.savings, 1000000, { message: 'U heeft hier een te hoog getal ingevoerd' });
  });
}
