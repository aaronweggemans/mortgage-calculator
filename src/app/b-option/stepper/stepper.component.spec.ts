import { StepperComponent } from './stepper.component';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { createComponentFactory, Spectator } from '@ngneat/spectator/vitest';
import { MatStepper } from '@angular/material/stepper';
import { StepperSelectionEvent } from '@angular/cdk/stepper';

describe('StepperComponent', () => {
  let spectator: Spectator<StepperComponent>;

  const createComponent = createComponentFactory(StepperComponent);

  beforeEach(() => {
    spectator = createComponent();
  });

  it('should create', () => {
    expect(spectator.component).toBeTruthy();
  });

  it('should call the next function on the MatStepper when next is called', () => {
    const nextSpy = vi.spyOn(spectator.query(MatStepper)!, 'next');
    spectator.component.next();
    expect(nextSpy).toHaveBeenCalled();
  });

  it('should call the previous function on the MatStepper when previous is called', () => {
    const previousSpy = vi.spyOn(spectator.query(MatStepper)!, 'previous');
    spectator.component.previous();
    expect(previousSpy).toHaveBeenCalled();
  });

  it('should call the reset function on the MatStepper when reset is called', () => {
    const resetSpy = vi.spyOn(spectator.query(MatStepper)!, 'reset');
    spectator.component.reset();
    expect(resetSpy).toHaveBeenCalled();
  });

  it('should emit the current selected step when selection changed is emitted from the MatStepper', () => {
    const stepChangedSpy = vi.spyOn(spectator.component.stepChanged, 'emit');
    const selectionChangeStub = { selectedIndex: 2 } as unknown as StepperSelectionEvent;
    spectator.query(MatStepper)!.selectionChange.emit(selectionChangeStub);
    expect(stepChangedSpy).toHaveBeenCalledWith(2);
  });
});
