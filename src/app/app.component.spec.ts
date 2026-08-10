import { AppComponent } from './app.component';
import { beforeEach, describe, expect, it } from 'vitest';
import { FormComponent } from './form/form.component';
import { CalculationComponent } from './calculation/calculation.component';
import { screen } from '@testing-library/dom';
import { createComponentFactory, Spectator } from '@ngneat/spectator/vitest';
import { MortgageCalculation } from './mortgage-calculation';

describe('AppComponent', () => {
  let spectator: Spectator<AppComponent>;

  const createComponent = createComponentFactory({
    component: AppComponent,
  });

  const mockedFormData: MortgageCalculation = {
    brutoInkomen: 40000,
    leeftijd: 35,
    partner: false,
    brutoInkomenPartner: null,
    leeftijdPartner: null,
    previousHouse: false,
    spaargeld: false,
    totaalGespaard: null,
  };

  beforeEach(() => {
    spectator = createComponent();
  });

  it('should create the app', () => {
    expect(spectator.component).toBeTruthy();
  });

  it('should initially not render the calculation component', () => {
    expect(spectator.query(CalculationComponent)).not.toExist();
  });

  it('should always render the form', () => {
    expect(spectator.query(FormComponent)).toExist();
  });

  it('should initially not render an error', () => {
    expect(
      screen.queryByText(
        'Er is iets mis gegaan. Wellicht heeft u niet alle waardes in de berekening goed gezet.',
      ),
    ).not.toExist();
  });

  it('should render an error when the form component emit an error', () => {
    spectator.query(FormComponent)!.formError.emit(true);
    spectator.detectChanges();
    expect(
      screen.getByText(
        'Er is iets mis gegaan. Wellicht heeft u niet alle waardes in de berekening goed gezet.',
      ),
    ).toExist();
  });

  it('should render the calculations component when the form emits valid values and does not have an error', () => {
    const formComponent = spectator.query(FormComponent)!;
    formComponent.formData.emit(mockedFormData);
    formComponent.formError.emit(false);
    spectator.detectChanges();
    expect(spectator.query(CalculationComponent)).toExist();
  });

  it('should never render the calculations component when there is an form error', () => {
    const formComponent = spectator.query(FormComponent)!;
    formComponent.formData.emit(mockedFormData);
    formComponent.formError.emit(true);
    spectator.detectChanges();
    expect(spectator.query(CalculationComponent)).not.toExist();
  });

  it('should pass the formdata to the calculations component when it emits and when there is no form error', () => {
    const formComponent = spectator.query(FormComponent)!;
    formComponent.formData.emit(mockedFormData);
    formComponent.formError.emit(false);
    spectator.detectChanges();
    expect(spectator.query(CalculationComponent)!.formData()).toEqual(mockedFormData);
  });
});
