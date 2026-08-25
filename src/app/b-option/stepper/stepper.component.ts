import { Component, output, viewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatStep, MatStepLabel, MatStepper, MatStepperIcon } from '@angular/material/stepper';
import { MatIcon } from '@angular/material/icon';

@Component({
  selector: 'app-stepper',
  imports: [FormsModule, MatStep, MatStepLabel, MatStepper, MatIcon, MatStepperIcon],
  templateUrl: './stepper.component.html',
  styleUrl: './stepper.component.scss',
})
export class StepperComponent {
  public readonly stepper = viewChild.required(MatStepper);
  public readonly stepChanged = output<number>();

  public next(): void {
    this.stepper().next();
  }

  public previous(): void {
    this.stepper().previous();
  }

  public reset(): void {
    this.stepper().reset();
  }
}
