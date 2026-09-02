import { Component, signal } from '@angular/core';
import { form } from '@angular/forms/signals';
import { createComponentFactory, Spectator } from '@ngneat/spectator/vitest';
import { StepBase } from './step-base.directive';
import { beforeEach, describe, expect, it } from 'vitest';

interface FormStub {
  name: string;
}

@Component({
  selector: 'app-step-test',
  template: '',
})
class StepComponentStub extends StepBase<FormStub> {
  private readonly name = signal<FormStub>({ name: '' });
  protected readonly form = form(this.name);
}

describe('StepBase', () => {
  let spectator: Spectator<StepComponentStub>;

  const createComponent = createComponentFactory({
    component: StepComponentStub,
  });

  beforeEach(() => {
    spectator = createComponent({ props: { data: { name: '' } } });
  });

  it('should create', () => {
    expect(spectator.component).toBeTruthy();
  });
});
