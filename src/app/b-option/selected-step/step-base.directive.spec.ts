import { Component, signal } from '@angular/core';
import { form, required } from '@angular/forms/signals';
import { createComponentFactory, Spectator } from '@ngneat/spectator/vitest';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { StepBase } from './step-base.directive';

type FormStub = {
  name: string;
};

@Component({
  selector: 'app-step-test',
  template: '',
})
class StepComponentStub extends StepBase<FormStub> {
  readonly formData = signal<FormStub>({ name: '' });

  protected readonly form = form(this.formData, (path) => {
    required(path.name);
  });
}

describe('StepBase', () => {
  let spectator: Spectator<StepComponentStub>;

  const createComponent = createComponentFactory({
    component: StepComponentStub,
    detectChanges: false,
  });

  beforeEach(() => {
    spectator = createComponent();
  });

  it('should create', () => {
    spectator.detectChanges();
    expect(spectator.component).toBeTruthy();
  });

  it('should emit true when the form is invalid', () => {
    const emitSpy = vi.spyOn(spectator.component.nextButtonValidity, 'emit');

    spectator.detectChanges();

    expect(emitSpy).toHaveBeenCalledExactlyOnceWith(true);
  });

  it('should emit false when the form is valid', () => {
    const emitSpy = vi.spyOn(spectator.component.nextButtonValidity, 'emit');

    spectator.component.formData.set({ name: 'John' });
    spectator.detectChanges();

    expect(emitSpy).toHaveBeenCalledExactlyOnceWith(false);
  });
});
