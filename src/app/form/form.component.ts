import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { CalculateMortgageService } from '../shared/services/calculate-mortgage.service';
import { MatSlideToggleChange } from '@angular/material/slide-toggle';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss'],
})
export class FormComponent {
  constructor(private calculations: CalculateMortgageService) {}

  hypotheek = new FormGroup({
    brutoInkomen: new FormControl(30000, [
      Validators.required,
      Validators.min(0),
      Validators.max(100000000),
    ]),
    leeftijd: new FormControl(20, [
      Validators.required,
      Validators.min(0),
      Validators.max(150),
    ]),

    partner: new FormControl(false),
    brutoInkomenPartner: new FormControl(0),
    leeftijdPartner: new FormControl(20),

    previousHouse: new FormControl(false),

    spaargeld: new FormControl(false),
    totaalGespaard: new FormControl(0),
  });

  get brutoInkomen() {
    return this.hypotheek.get('brutoInkomen');
  }
  get leeftijd() {
    return this.hypotheek.get('leeftijd');
  }
  get partner() {
    return this.hypotheek.get('partner');
  }
  get brutoInkomenPartner() {
    return this.hypotheek.get('brutoInkomenPartner');
  }
  get leeftijdPartner() {
    return this.hypotheek.get('leeftijdPartner');
  }
  get spaargeld() {
    return this.hypotheek.get('spaargeld');
  }
  get totaalGespaard() {
    return this.hypotheek.get('totaalGespaard');
  }
  get previousHouse() {
    return this.hypotheek.get('previousHouse');
  }

  togglePartner(event: MatSlideToggleChange) {
    this.brutoInkomenPartner?.setValidators(
      event.checked
        ? [Validators.required, Validators.min(0), Validators.max(100000000)]
        : null
    );
    this.leeftijdPartner?.setValidators(
      event.checked
        ? [Validators.required, Validators.min(0), Validators.max(150)]
        : null
    );

    this.brutoInkomenPartner?.updateValueAndValidity();
    this.leeftijdPartner?.updateValueAndValidity();
  }

  toggleSpaargeld(event: MatSlideToggleChange) {
    this.totaalGespaard?.setValidators(
      event.checked
        ? [Validators.required, Validators.min(0), Validators.max(100000000)]
        : null
    );
    this.totaalGespaard?.updateValueAndValidity();
  }

  submitForm(): void {
    if (this.hypotheek.invalid) {
      this.calculations.setError(true);
      return;
    }

    this.calculations.setError(false);
    this.calculations.setFormData(this.hypotheek.value);
  }
}
