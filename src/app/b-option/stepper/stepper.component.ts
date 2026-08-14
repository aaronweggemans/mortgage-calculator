import { Component, output, viewChild, ViewEncapsulation } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatStep, MatStepLabel, MatStepper } from '@angular/material/stepper';
import { StepperSelectionEvent } from '@angular/cdk/stepper';

@Component({
  selector: 'app-stepper',
  imports: [FormsModule, MatStep, MatStepLabel, MatStepper],
  templateUrl: './stepper.component.html',
  styleUrl: './stepper.component.scss',
  encapsulation: ViewEncapsulation.None,
})
export class StepperComponent {
  public readonly stepper = viewChild.required(MatStepper);

  readonly stepChanged = output<number>();

  onStepChange(event: StepperSelectionEvent) {
    this.stepChanged.emit(event.selectedIndex);
  }

  next() {
    this.stepper().next();
  }
}
