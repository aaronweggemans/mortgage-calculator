import { StepBase } from './step-base-class.directive';
import { beforeEach, describe, expect, it } from 'vitest';
import { createDirectiveFactory, SpectatorDirective } from '@ngneat/spectator/vitest';

describe('Step', () => {
  let spectator: SpectatorDirective<StepBase<any>>;

  const createDirective = createDirectiveFactory({ directive: StepBase });

  beforeEach(() => {
    spectator = createDirective();
  });

  it('should create', () => {
    expect(spectator.directive).toBeTruthy();
  });
});
