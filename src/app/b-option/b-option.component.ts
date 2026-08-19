import { Component, computed, signal, viewChild } from '@angular/core';
import { StepperComponent } from './stepper/stepper.component';
import { Stap1Component } from './stap-1/stap-1.component';
import { Stap2Component } from './stap-2/stap-2.component';
import { Stap3Component } from './stap-3/stap-3.component';
import { Stap4Component } from './stap-4/stap-4.component';

@Component({
  selector: 'app-b-option',
  imports: [StepperComponent, Stap1Component, Stap2Component, Stap3Component, Stap4Component],
  templateUrl: './b-option.component.html',
})
export class BOptionComponent {
  private readonly stepper = viewChild.required(StepperComponent);

  protected readonly selectedStep = signal<number>(0);
  protected readonly visuallySelectedStep = computed<string>(
    () => `Step ${this.selectedStep() + 1}`,
  );

  protected onStepChanged(step: number) {
    this.selectedStep.set(step);
  }

  protected next() {
    this.stepper().next();
  }

  protected previous() {
    this.stepper().previous();
  }
}
