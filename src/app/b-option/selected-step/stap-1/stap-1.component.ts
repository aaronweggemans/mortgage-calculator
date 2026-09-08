import { Component } from '@angular/core';
import { MatIcon } from '@angular/material/icon';
import { form, FormField, maxDate, required } from '@angular/forms/signals';
import { PersonalForm } from '../selected-step.models';
import { StepBase } from '../step-base.directive';

@Component({
  selector: 'app-stap-1',
  imports: [MatIcon, FormField],
  templateUrl: './stap-1.component.html',
})
export class Stap1Component extends StepBase<PersonalForm> {
  protected readonly form = form(this.data, (path) => {
    required(path.dateOfBirth, { message: 'Vul uw geboortedatum in.' });
    maxDate(path.dateOfBirth, new Date(), {
      message: 'U kunt geen datum in de toekomst invullen.',
    });
    required(path.status, { message: 'Selecteer of uw gehuwd of ongehuwd bent.' });
  });
}
