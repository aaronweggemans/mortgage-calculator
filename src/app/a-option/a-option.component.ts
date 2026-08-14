import { Component, signal } from '@angular/core';
import { CalculationComponent } from './calculation/calculation.component';
import { FormComponent } from './form/form.component';
import { MortgageCalculation } from './mortgage-calculation';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { MatStepperModule } from '@angular/material/stepper';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonToggleModule } from '@angular/material/button-toggle';

@Component({
  selector: 'app-a-option',
  imports: [CalculationComponent, FormComponent],
  templateUrl: './a-option.component.html',
  providers: [
    BrowserModule,
    ReactiveFormsModule,
    MatStepperModule,
    MatSlideToggleModule,
    MatButtonModule,
    MatIconModule,
    MatButtonToggleModule,
  ],
})
export class AOptionComponent {
  protected readonly formError = signal(false);
  protected readonly formData = signal<MortgageCalculation | null>(null);
}
