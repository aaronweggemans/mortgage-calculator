import { Component, signal, viewChild } from '@angular/core';
import { StepperComponent } from './stepper/stepper.component';
import { SelectedStepComponent } from './selected-step/selected-step.component';

@Component({
  selector: 'app-b-option',
  imports: [StepperComponent, SelectedStepComponent],
  templateUrl: './b-option.component.html',
})
export class BOptionComponent {
  protected readonly stepper = viewChild.required(StepperComponent);
  protected readonly selectedStep = signal<number>(0);
}
