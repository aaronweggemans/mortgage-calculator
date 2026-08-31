import { Component, signal } from '@angular/core';
import { LivingForm } from '../selected-step.models';
import { form } from '@angular/forms/signals';
import { StepBase } from '../step-base.directive';

@Component({
  selector: 'app-stap-3',
  templateUrl: './stap-3.component.html',
})
export class Stap3Component extends StepBase<LivingForm> {
  protected readonly hasEerderHuisGekocht = signal<boolean | null>(null);

  protected form = form<LivingForm>(this.data);
}
