import { AfterViewInit, Component, output, viewChild, ViewEncapsulation } from '@angular/core';
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
export class StepperComponent implements AfterViewInit {
  public readonly stepper = viewChild.required(MatStepper);
  public readonly stepChanged = output<number>();

  /**
   * I know, not really a good practice, but this forces the mat stepper not to be able to tab trough.
   * I just want the stepper to be a visual representation of the current step, not to be a navigation tool.
   */
  ngAfterViewInit(): void {
    this.stepper()._stepHeader.forEach((item) => {
      item._elementRef.nativeElement.tabIndex = -1;
    });
  }

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
