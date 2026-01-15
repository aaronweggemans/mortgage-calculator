import { FormComponent } from './form.component';
import { beforeEach, describe, expect, it } from 'vitest';
import { screen, within } from '@testing-library/dom';
import { MatSlideToggle, MatSlideToggleChange } from '@angular/material/slide-toggle';
import { createComponentFactory, Spectator } from '@ngneat/spectator/vitest';
import { ReactiveFormsModule } from '@angular/forms';
import { MatStepper } from '@angular/material/stepper';

describe('FormComponent', () => {
  let spectator: Spectator<FormComponent>;

  const errorCases = [
    { input: '', expectation: 'U moet hier een valide waarde invullen.' },
    { input: 'e', expectation: 'U moet hier een valide waarde invullen.' },
    { input: '-40000', expectation: 'Negatieve getallen zijn niet toegestaan.' },
    { input: '9'.repeat(10), expectation: 'U heeft hier een te hoog getal.' },
  ];

  const onDataTestId = (testId: string) => ({
    name: (_: string, el: Element) => el.getAttribute('data-testid') === testId,
  });

  const getMatSlideToggleById: (id: string) => MatSlideToggle = (id: string) =>
    spectator.queryAll(MatSlideToggle).find((toggle: MatSlideToggle) => toggle.id === id)!;

  const toggleMatSlideToggleById: (id: string) => void = (id: string) => {
    const matSlideToggle = getMatSlideToggleById(id);
    matSlideToggle.toggle();
    matSlideToggle.change.emit(new MatSlideToggleChange(matSlideToggle, true));
    spectator.detectChanges();
  };

  const createComponent = createComponentFactory({
    component: FormComponent,
    imports: [ReactiveFormsModule],
  });

  beforeEach(() => {
    spectator = createComponent();
  });

  it('should create', () => {
    expect(spectator.component).toBeTruthy();
  });

  describe('Step 1', () => {
    it('should render bruto jaar inkomen', () => {
      expect(screen.getByLabelText('Wat is uw bruto jaar inkomen')).toExist();
    });

    it('should render leeftijd', () => {
      expect(screen.getByLabelText('Wat is uw leeftijd')).toExist();
    });

    it.each(errorCases)(
      'should show an error on bruto jaar inkomen when a invalid value is entered',
      ({ input, expectation }) => {
        spectator.typeInElement(input, screen.getByLabelText('Wat is uw bruto jaar inkomen'));
        expect(
          within(screen.getByRole('alert', onDataTestId('brutoInkomen'))).getByText(expectation),
        ).toExist();
      },
    );

    it.each(errorCases)(
      'should show an error on leeftijd when a invalid value is entered',
      ({ input, expectation }) => {
        spectator.typeInElement(input, screen.getByLabelText('Wat is uw leeftijd'));
        expect(
          within(screen.getByRole('alert', onDataTestId('leeftijd'))).getByText(expectation),
        ).toExist();
      },
    );

    it('should be able to toggle the partner button to calculate income with partner', () => {
      expect(screen.queryByLabelText('Bruto jaarinkomen van uw partner')).not.toExist();
      expect(screen.queryByLabelText('Leeftijd van uw partner')).not.toExist();

      toggleMatSlideToggleById('heeft-een-partner');

      expect(screen.getByLabelText('Bruto jaarinkomen van uw partner')).toExist();
      expect(screen.getByLabelText('Leeftijd van uw partner')).toExist();
    });

    it.each(errorCases)(
      'should show an error on bruto jaar inkomen of the partner when a invalid value is entered',
      ({ input, expectation }) => {
        toggleMatSlideToggleById('heeft-een-partner');

        spectator.typeInElement(input, screen.getByLabelText('Bruto jaarinkomen van uw partner'));
        spectator.detectChanges();

        expect(
          within(screen.getByRole('alert', onDataTestId('brutoInkomenPartner'))).queryByText(
            expectation,
          ),
        ).toExist();
      },
    );

    it.each(errorCases)(
      'should show an error on leeftijd of the partner when a invalid value is entered',
      ({ input, expectation }) => {
        toggleMatSlideToggleById('heeft-een-partner');

        const leeftijdPartner = screen.getByLabelText('Leeftijd van uw partner');
        const getError = screen.getByRole('alert', {
          name: (_, el) => el.getAttribute('data-testid') === 'leeftijdPartner',
        })!;
        spectator.typeInElement(input, leeftijdPartner);
        expect(within(getError).queryByText(expectation)).toExist();
      },
    );
  });

  describe('Step 2', () => {
    beforeEach(() => {
      spectator.query(MatStepper)!.next();
      spectator.detectChanges();
    });

    it('should be possible to toggle the button previously i bought a house', () => {
      expect(getMatSlideToggleById('eerder-een-huis')).toExist();
    });
  });

  describe('Step 3', () => {
    beforeEach(() => {
      spectator.query(MatStepper)!.next();
      spectator.query(MatStepper)!.next();
      spectator.detectChanges();
    });

    it('should initially not show the spaargeld input', () => {
      expect(screen.queryByLabelText('Uw spaargeld')).not.toExist();
    });

    it('should be able to toggle and show the spaargeld input', () => {
      toggleMatSlideToggleById('toggle-spaargeld');
      expect(screen.getByLabelText('Uw spaargeld')).toExist();
    });

    it.each(errorCases)(
      'should handle invalid values in the spaargeld input',
      ({ input, expectation }) => {
        toggleMatSlideToggleById('toggle-spaargeld');

        const spaargeld = screen.getByLabelText('Uw spaargeld');
        const getError = screen.getByRole('alert', {
          name: (_, el) => el.getAttribute('data-testid') === 'totaalGespaard',
        })!;
        spectator.typeInElement(input, spaargeld);
        expect(within(getError).queryByText(expectation)).toExist();
      },
    );
  });
});
