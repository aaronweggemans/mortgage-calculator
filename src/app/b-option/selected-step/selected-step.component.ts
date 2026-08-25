import { Component, input, output } from '@angular/core';
import { Stap1Component } from './stap-1/stap-1.component';
import { Stap2Component } from './stap-2/stap-2.component';
import { Stap3Component } from './stap-3/stap-3.component';
import { Stap4Component } from './stap-4/stap-4.component';

@Component({
  selector: 'app-selected-step',
  imports: [Stap1Component, Stap2Component, Stap3Component, Stap4Component],
  templateUrl: './selected-step.component.html',
})
export class SelectedStepComponent {
  public readonly step = input.required<number>();

  public readonly next = output<void>();
  public readonly previous = output<void>();
  public readonly resetFlow = output<void>();
}
