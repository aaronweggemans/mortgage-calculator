import { describe, beforeEach, it, expect } from 'vitest';
import { CalculationService } from './calculation.service';
import { createServiceFactory, SpectatorService } from '@ngneat/spectator/vitest';

describe('CalculateMortgageService', () => {
  let service: SpectatorService<CalculationService>;

  const createService = createServiceFactory({
    service: CalculationService,
  });

  beforeEach(() => {
    service = createService();
  });

  it('should create', () => {
    expect(service).toBeTruthy();
  });
});
