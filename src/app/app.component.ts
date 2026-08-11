import { Component, signal } from '@angular/core';
import { FormComponent } from './form/form.component';
import { CalculationComponent } from './calculation/calculation.component';
import { MortgageCalculation } from './mortgage-calculation';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  imports: [FormComponent, CalculationComponent],
})
export class AppComponent {
  protected readonly formError = signal(false);
  protected readonly formData = signal<MortgageCalculation | null>(null);
}
