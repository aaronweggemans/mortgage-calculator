import { beforeEach, describe, expect, it, vi } from 'vitest';
import { createComponentFactory, Spectator } from '@ngneat/spectator/vitest';
import { BOptionComponent } from './b-option.component';
import { StepperComponent } from './stepper/stepper.component';
import { SelectedStepComponent } from './selected-step/selected-step.component';
import { MockComponent } from 'ng-mocks';

describe('BOptionComponent', () => {
  let spectator: Spectator<BOptionComponent>;

  const createComponent = createComponentFactory({
    component: BOptionComponent,
    componentImports: [
      [StepperComponent, MockComponent(StepperComponent)],
      [SelectedStepComponent, MockComponent(SelectedStepComponent)],
    ],
  });

  beforeEach(() => {
    spectator = createComponent();
  });

  it('should create', () => {
    expect(spectator.component).toBeTruthy();
  });

  it('should always show the stepper', () => {
    expect(spectator.query(StepperComponent)).toExist();
  });

  it('should always show the selected step wrapper', () => {
    expect(spectator.query(SelectedStepComponent)).toExist();
  });

  it('should initially show the first step in the selected step wrapper', () => {
    expect(spectator.query(SelectedStepComponent)?.step()).toBe(0);
  });

  it('should pass the selected step from the stepper to the selected step wrapper', () => {
    spectator.query(StepperComponent)?.stepChanged.emit(1);
    spectator.detectChanges();
    expect(spectator.query(SelectedStepComponent)?.step()).toBe(1);
  });

  it('should call the next function on the stepper when the next button is clicked', () => {
    const spyOnNext = vi.spyOn(spectator.query(StepperComponent)!, 'next');
    spectator.query(SelectedStepComponent)!.next.emit();
    expect(spyOnNext).toHaveBeenCalledOnce();
  });

  it('should call the previous function on the stepper when the previous button is clicked', () => {
    const spyOnPrevious = vi.spyOn(spectator.query(StepperComponent)!, 'previous');
    spectator.query(SelectedStepComponent)!.previous.emit();
    expect(spyOnPrevious).toHaveBeenCalledOnce();
  });

  it('should reset the flow when the reset flow button is clicked', () => {
    const spyOnReset = vi.spyOn(spectator.query(StepperComponent)!, 'reset');
    spectator.query(SelectedStepComponent)!.resetFlow.emit();
    expect(spyOnReset).toHaveBeenCalledOnce();
  });
});
