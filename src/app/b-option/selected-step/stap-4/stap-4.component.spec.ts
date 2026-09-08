import { Stap4Component } from './stap-4.component';
import { beforeEach, describe, expect, it } from 'vitest';
import { createComponentFactory, mockProvider, Spectator } from '@ngneat/spectator/vitest';
import { MortgageCalculationService } from '../../../shared/mortgage-calculation.service';

describe('Stap4Component', () => {
  let spectator: Spectator<Stap4Component>;

  const createComponent = createComponentFactory({
    component: Stap4Component,
    providers: [mockProvider(MortgageCalculationService)],
  });

  beforeEach(() => {
    spectator = createComponent({ props: { income: 0, partnerIncome: 0 } });
  });

  it('should create', () => {
    expect(spectator.component).toBeTruthy();
  });
});
