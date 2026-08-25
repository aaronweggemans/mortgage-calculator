import { beforeEach, describe, expect, it } from 'vitest';
import { SelectedStepComponent } from './selected-step.component';
import { createComponentFactory, Spectator } from '@ngneat/spectator/vitest';

describe('SelectedStepComponent', () => {
  let spectator: Spectator<SelectedStepComponent>;

  const createComponent = createComponentFactory(SelectedStepComponent);

  beforeEach(() => {
    spectator = createComponent();
  });

  it('should create', () => {
    expect(spectator.component).toBeTruthy();
  });
});
