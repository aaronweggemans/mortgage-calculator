import { CalculationComponent } from './calculation.component';
import { beforeEach, describe, expect, it } from 'vitest';
import { createComponentFactory, Spectator } from '@ngneat/spectator/vitest';

describe('CalculationComponent', () => {
  let spectator: Spectator<CalculationComponent>;

  const createComponent = createComponentFactory({
    component: CalculationComponent,
  });

  beforeEach(() => {
    spectator = createComponent();
  });

  it('should create', () => {
    expect(spectator.component).toBeTruthy();
  });
});
