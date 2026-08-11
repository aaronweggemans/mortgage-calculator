import { Component, output, signal } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatSlideToggle } from '@angular/material/slide-toggle';
import { MatStep, MatStepLabel, MatStepper, MatStepperNext } from '@angular/material/stepper';
import { NgTemplateOutlet } from '@angular/common';
import { MatButton, MatMiniFabButton } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import { MortgageCalculation } from '../mortgage-calculation';
import { form, FormField, max, min, required } from '@angular/forms/signals';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss'],
  imports: [
    MatStepper,
    ReactiveFormsModule,
    MatStep,
    MatStepLabel,
    NgTemplateOutlet,
    MatSlideToggle,
    MatStepperNext,
    MatMiniFabButton,
    MatIcon,
    MatButton,
    FormField,
  ],
})
export class FormComponent {
  public readonly formError = output<boolean>();
  public readonly formData = output<MortgageCalculation>();

  protected readonly formModal = signal<MortgageCalculation>({
    brutoInkomen: 30000,
    leeftijd: 20,
    partner: false,
    brutoInkomenPartner: 0,
    leeftijdPartner: 20,
    previousHouse: false,
    spaargeld: false,
    totaalGespaard: 0,
  });

  protected readonly form = form<MortgageCalculation>(this.formModal, (schemaPath) => {
    required(schemaPath.brutoInkomen, { message: 'U moet hier een valide waarde invullen.' });
    min(schemaPath.brutoInkomen, 0, { message: 'Negatieve getallen zijn niet toegestaan.' });
    max(schemaPath.brutoInkomen, 100000000, { message: 'U heeft hier een te hoog getal.' });
    required(schemaPath.leeftijd, { message: 'U moet hier een valide waarde invullen.' });
    min(schemaPath.leeftijd, 0, { message: 'Negatieve getallen zijn niet toegestaan.' });
    max(schemaPath.leeftijd, 150, { message: 'U heeft hier een te hoog getal.' });
    required(schemaPath.brutoInkomenPartner, {
      message: 'U moet hier een valide waarde invullen.',
      when: ({ valueOf }) => valueOf(schemaPath.partner),
    });
    min(schemaPath.brutoInkomenPartner, 0, {
      message: 'U moet hier een valide waarde invullen.',
      when: ({ valueOf }) => valueOf(schemaPath.partner),
    });
    max(schemaPath.brutoInkomenPartner, 100000000, {
      message: 'U moet hier een valide waarde invullen.',
      when: ({ valueOf }) => valueOf(schemaPath.partner),
    });
  });

  protected submitForm(): void {
    this.formError.emit(this.form().invalid());
    this.formData.emit(this.form().value());
  }
}
