import { Component, output, OutputEmitterRef } from '@angular/core';
import {
  FormControl,
  FormGroup,
  Validators,
  ReactiveFormsModule,
  AbstractControl,
} from '@angular/forms';
import { MatSlideToggleChange, MatSlideToggle } from '@angular/material/slide-toggle';
import { MatStepper, MatStep, MatStepLabel, MatStepperNext } from '@angular/material/stepper';
import { NgTemplateOutlet } from '@angular/common';
import { MatMiniFabButton, MatButton } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import { MortgageCalculation } from '../mortgage-calculation';

type MortageCalculationForm = {
  [K in keyof MortgageCalculation]: AbstractControl<MortgageCalculation[K]>;
};

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
  ],
})
export class FormComponent {
  public readonly formError: OutputEmitterRef<boolean> = output<boolean>();
  public readonly formData: OutputEmitterRef<MortgageCalculation> = output<MortgageCalculation>();

  protected readonly form = new FormGroup<MortageCalculationForm>({
    brutoInkomen: new FormControl(30000, {
      validators: [Validators.required, Validators.min(0), Validators.max(100000000)],
      nonNullable: true,
    }),
    leeftijd: new FormControl(20, {
      validators: [Validators.required, Validators.min(0), Validators.max(150)],
      nonNullable: true,
    }),
    partner: new FormControl(false, { validators: [Validators.required], nonNullable: true }),
    brutoInkomenPartner: new FormControl(0),
    leeftijdPartner: new FormControl(20),
    previousHouse: new FormControl(false, { validators: [Validators.required], nonNullable: true }),
    spaargeld: new FormControl(false, { validators: [Validators.required], nonNullable: true }),
    totaalGespaard: new FormControl(0),
  });

  get brutoInkomen(): AbstractControl {
    return this.form.get('brutoInkomen')!;
  }
  get leeftijd(): AbstractControl {
    return this.form.get('leeftijd')!;
  }
  get partner(): AbstractControl {
    return this.form.get('partner')!;
  }
  get brutoInkomenPartner(): AbstractControl {
    return this.form.get('brutoInkomenPartner')!;
  }
  get leeftijdPartner(): AbstractControl {
    return this.form.get('leeftijdPartner')!;
  }
  get spaargeld(): AbstractControl {
    return this.form.get('spaargeld')!;
  }
  get totaalGespaard(): AbstractControl {
    return this.form.get('totaalGespaard')!;
  }

  protected togglePartner(event: MatSlideToggleChange): void {
    const brutoInkomenPartnerRules = event.checked
      ? [Validators.required, Validators.min(0), Validators.max(100000000)]
      : null;

    const leeftijdPartnerRules = event.checked
      ? [Validators.required, Validators.min(0), Validators.max(150)]
      : null;

    this.brutoInkomenPartner.setValidators(brutoInkomenPartnerRules);
    this.brutoInkomenPartner.updateValueAndValidity();

    this.leeftijdPartner.setValidators(leeftijdPartnerRules);
    this.leeftijdPartner.updateValueAndValidity();
  }

  protected toggleSpaargeld(event: MatSlideToggleChange): void {
    const rules = event.checked
      ? [Validators.required, Validators.min(0), Validators.max(100000000)]
      : null;

    this.totaalGespaard.setValidators(rules);
    this.totaalGespaard.updateValueAndValidity();
  }

  protected submitForm(): void {
    this.formError.emit(this.form.invalid);
    this.formData.emit(this.form.getRawValue());
  }
}
