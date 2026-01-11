import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { beforeEach, describe, expect, it } from 'vitest';
import { FormComponent } from './form/form.component';
import { By } from '@angular/platform-browser';
import { CalculationComponent } from './calculation/calculation.component';
import { screen } from '@testing-library/dom';

describe('AppComponent', () => {
  let fixture: ComponentFixture<AppComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({ imports: [AppComponent] }).compileComponents();
    fixture = TestBed.createComponent(AppComponent);
  });

  it('should create the app', () => {
    expect(fixture.componentInstance).toBeTruthy();
  });

  it('should initially not render the calculation component', () => {
    expect(fixture.debugElement.query(By.directive(CalculationComponent))).toBeNull();
  });

  it('should always render the form', () => {
    expect(fixture.debugElement.query(By.directive(FormComponent))).not.toBeNull();
  });

  it('should initially not render an error', () => {
    expect(
      screen.queryByText(
        'Er is iets mis gegaan. Wellicht heeft u niet alle waardes in de berekening goed gezet.',
      ),
    ).toBeNull();
  });

  it('should render an error when the form component emit an error', () => {
    const formComponent = fixture.debugElement.query(By.directive(FormComponent));
    formComponent.componentInstance.formError.emit(true);
    fixture.detectChanges();
    expect(
      screen.getByText(
        'Er is iets mis gegaan. Wellicht heeft u niet alle waardes in de berekening goed gezet.',
      ),
    ).not.toBeNull();
  });

  it('should render the calculations component when the form emits valid values and does not have an error', () => {
    const formComponent = fixture.debugElement.query(By.directive(FormComponent));
    formComponent.componentInstance.formData.emit({});
    formComponent.componentInstance.formError.emit(false);
    fixture.detectChanges();
    expect(fixture.debugElement.query(By.directive(CalculationComponent))).not.toBeNull();
  });

  it('should never render the calculations component when there is an form error', () => {
    const formComponent = fixture.debugElement.query(By.directive(FormComponent));
    formComponent.componentInstance.formData.emit({});
    formComponent.componentInstance.formError.emit(true);
    fixture.detectChanges();
    expect(fixture.debugElement.query(By.directive(CalculationComponent))).toBeNull();
  });
});
