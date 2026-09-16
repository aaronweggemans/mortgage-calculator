import { Component, output, viewChild, ViewEncapsulation } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatStep, MatStepLabel, MatStepper, MatStepperIcon } from '@angular/material/stepper';
import { MatIcon } from '@angular/material/icon';

@Component({
  selector: 'app-stepper',
  imports: [FormsModule, MatStep, MatStepLabel, MatStepper, MatIcon, MatStepperIcon],
  encapsulation: ViewEncapsulation.None,
  templateUrl: './stepper.component.html',
  styleUrl: './stepper.component.scss',
})
export class StepperComponent {
  readonly stepper = viewChild.required(MatStepper);
  readonly stepChanged = output<number>();

  next(): void {
    this.stepper().next();
  }

  previous(): void {
    this.stepper().previous();
  }

  reset(): void {
    this.stepper().reset();
  }
}
