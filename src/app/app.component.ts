import { Component } from '@angular/core';
import { FormComponent } from './form/form.component';
import { CalculationComponent } from './calculation/calculation.component';
import { MortgageCalculation } from './mortgage-calculation';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  imports: [FormComponent, CalculationComponent],
})
export class AppComponent {
  protected formError = false;
  protected formData: MortgageCalculation | null = null;

  protected setFormData(formData: MortgageCalculation) {
    this.formData = formData;
  }
}
