import { Component } from '@angular/core';
import { FormComponent } from './form/form.component';
import { CalculationComponent } from './calculation/calculation.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  imports: [FormComponent, CalculationComponent],
})
export class AppComponent {}
