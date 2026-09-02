import { StepBase } from './step-base.directive';
import { beforeEach, describe, expect, it } from 'vitest';
import { createComponentFactory, Spectator } from '@ngneat/spectator/vitest';

describe('Step', () => {
  let spectator: Spectator<StepBase<any>>;

  const createComponent = createComponentFactory({ component: StepBase });

  beforeEach(() => {
    spectator = createComponent();
  });

  it('should create', () => {
    expect(spectator.component).toBeTruthy();
  });
});
