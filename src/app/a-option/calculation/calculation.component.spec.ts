import { CalculationComponent } from './calculation.component';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { createComponentFactory, mockProvider, Spectator } from '@ngneat/spectator/vitest';
import { screen } from '@testing-library/dom';
import { MortgageCalculation } from '../mortgage-calculation';
import { MortgageCalculationService } from '../../shared/mortgage-calculation.service';
import { CurrencyPipe } from '@angular/common';
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'currency' })
class CurrencyPipeMock implements PipeTransform {
  transform(value: number) {
    return value;
  }
}

describe('CalculationComponent', () => {
  let spectator: Spectator<CalculationComponent>;
  const emptyFormData: MortgageCalculation = {
    brutoInkomen: 45000,
    leeftijd: 20,
    partner: false,
    brutoInkomenPartner: null,
    leeftijdPartner: null,
    previousHouse: true,
    spaargeld: false,
    totaalGespaard: null,
  };

  const createComponent = createComponentFactory({
    component: CalculationComponent,
    providers: [
      mockProvider(MortgageCalculationService, {
        calculateMaxMortgage: vi.fn().mockReturnValue(270000),
      }),
    ],
    overrideComponents: [
      [
        CalculationComponent,
        {
          remove: {
            imports: [CurrencyPipe],
          },
          add: {
            imports: [CurrencyPipeMock],
          },
        },
      ],
    ],
  });

  describe('Always rendered definitions', () => {
    beforeEach(() => {
      spectator = createComponent({
        props: { formData: emptyFormData },
      });
    });

    it('should create', () => {
      expect(spectator.component).toBeTruthy();
    });

    it('should render the definition of Uw bruto jaarinkomen', () => {
      expect(screen.getByRole('definition', { name: 'Uw bruto jaarinkomen' })).toExist();
    });

    it('should render Totaal bruto jaarinkomen', () => {
      expect(screen.getByRole('definition', { name: 'Totaal bruto jaarinkomen' })).toExist();
      expect(screen.getByRole('definition', { name: 'Totaal bruto jaarinkomen' })).toContainText(
        '45000',
      );
    });

    it('should render Maximale hypotheek', () => {
      expect(screen.getByRole('definition', { name: 'Maximale hypotheek' })).toExist();
      expect(screen.getByRole('definition', { name: 'Maximale hypotheek' })).toContainText(
        '270000',
      );
    });

    it('should render Benodigde eigen geld', () => {
      expect(screen.getByRole('definition', { name: 'Benodigde eigen geld' })).toExist();
    });

    it('should render Berekende maandlast', () => {
      expect(screen.getByRole('definition', { name: 'Berekende maandlast' })).toExist();
    });

    it('should render Overdrachtsbelasting (2%)', () => {
      expect(screen.getByRole('definition', { name: 'Overdrachtsbelasting (2%)' })).toExist();
    });
  });

  describe('Definitions that should initially not be rendered', () => {
    beforeEach(() => {
      spectator = createComponent({ props: { formData: emptyFormData } });
    });

    it('should create', () => {
      expect(spectator.component).toBeTruthy();
    });

    it('should not render definition Bruto jaarinkomen partner', () => {
      expect(screen.queryByRole('definition', { name: 'Bruto jaarinkomen partner' })).not.toExist();
    });

    it('should not render Totaal spaargeld', () => {
      expect(screen.queryByRole('definition', { name: 'Totaal spaargeld' })).not.toExist();
    });

    it('should not render Totaal te realiseren hypotheek', () => {
      expect(
        screen.queryByRole('definition', { name: 'Totaal te realiseren hypotheek' }),
      ).not.toExist();
    });

    it('should not render U betaald geen overdrachtsbelasting', () => {
      expect(
        screen.queryByRole('definition', { name: 'U betaald geen overdrachtsbelasting' }),
      ).not.toExist();
    });
  });

  describe('With partner', () => {
    beforeEach(() => {
      spectator = createComponent({
        props: {
          formData: {
            ...emptyFormData,
            partner: true,
            brutoInkomenPartner: 20000,
            leeftijdPartner: 25,
          },
        },
        providers: [
          mockProvider(MortgageCalculationService, {
            calculateMaxMortgage: vi.fn().mockReturnValue(500000),
          }),
        ],
      });
    });

    it('should create', () => {
      expect(spectator.component).toBeTruthy();
    });

    it('should render definition Bruto jaarinkomen partner', () => {
      expect(screen.getByRole('definition', { name: 'Bruto jaarinkomen partner' })).toExist();
    });

    it('should calculate totaal bruto jaarinkomen', () => {
      expect(screen.getByRole('definition', { name: 'Totaal bruto jaarinkomen' })).toExist();
      expect(screen.getByRole('definition', { name: 'Totaal bruto jaarinkomen' })).toContainText(
        '65000',
      );
    });

    it('should render Maximale hypotheek for partner and user', () => {
      expect(screen.getByRole('definition', { name: 'Maximale hypotheek' })).toExist();
      expect(screen.getByRole('definition', { name: 'Maximale hypotheek' })).toContainText(
        '500000',
      );
    });

    it('should render Overdrachtsbelasting (2%)', () => {
      expect(screen.getByRole('definition', { name: 'Overdrachtsbelasting (2%)' })).toExist();
    });
  });

  describe('All input depending on the calculation service', () => {
    beforeEach(() => {
      spectator = createComponent({
        props: { formData: emptyFormData },
        providers: [
          mockProvider(MortgageCalculationService, {
            calculateMaxMortgage: vi.fn().mockReturnValue(500000),
            monthlyCosts: vi.fn().mockReturnValue(2200),
            ownContribution: vi.fn().mockReturnValue(48000),
            transferTax: vi.fn().mockReturnValue(9600),
          }),
        ],
      });
    });

    it('should create', () => {
      expect(spectator.component).toBeTruthy();
    });

    it('should render Berekende maandlast', () => {
      expect(screen.getByRole('definition', { name: 'Berekende maandlast' })).toExist();
      expect(screen.getByRole('definition', { name: 'Berekende maandlast' })).toContainText('2200');
    });

    it('should render Benodigde eigen geld', () => {
      expect(screen.getByRole('definition', { name: 'Benodigde eigen geld' })).toExist();
      expect(screen.getByRole('definition', { name: 'Benodigde eigen geld' })).toContainText(
        '48000',
      );
    });

    it('should render Overdrachtsbelasting (2%)', () => {
      expect(screen.getByRole('definition', { name: 'Overdrachtsbelasting (2%)' })).toExist();
      expect(screen.getByRole('definition', { name: 'Overdrachtsbelasting (2%)' })).toContainText(
        '9600',
      );
    });
  });
});
