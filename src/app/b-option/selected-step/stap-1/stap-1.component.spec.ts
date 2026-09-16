import { beforeEach, describe, expect, it } from 'vitest';
import { createComponentFactory, Spectator } from '@ngneat/spectator/vitest';
import { Stap1Component } from './stap-1.component';
import { fireEvent, screen, within } from '@testing-library/dom';

describe('Stap1Component', () => {
  let spectator: Spectator<Stap1Component>;

  let dateError: HTMLDivElement;
  let statusError: HTMLDivElement;

  const createComponent = createComponentFactory({
    component: Stap1Component,
  });

  beforeEach(() => {
    spectator = createComponent({ props: { data: { dateOfBirth: null, status: '' } } });

    dateError = screen.getByRole('alert', {
      name: (_, el) => el.getAttribute('data-testid') === 'date-of-birth-error',
    });

    statusError = screen.getByRole('alert', {
      name: (_, el) => el.getAttribute('data-testid') === 'status-error',
    });
  });

  it('should create', () => {
    expect(spectator.component).toBeTruthy();
  });

  it('should render the correct form fields', () => {
    expect(screen.getByLabelText('Geboortedatum')).toExist();
    expect(screen.getByLabelText('Relatiestatus')).toExist();
  });

  it('should update the date of birth', () => {
    // For date use fireEvent
    fireEvent.input(screen.getByLabelText('Geboortedatum'), { target: { value: '2000-01-01' } });
    expect(screen.getByLabelText('Geboortedatum')).toHaveValue('2000-01-01');
  });

  it('should update the relationship status', () => {
    spectator.selectOption(screen.getByLabelText('Relatiestatus'), 'married');
    spectator.detectChanges();

    expect(screen.getByLabelText('Relatiestatus')).toHaveValue('married');
  });

  describe('Error handling for date of birth', () => {
    it('should show an error when date of birth is empty and touched', () => {
      spectator.blur(screen.getByLabelText('Geboortedatum'));
      spectator.detectChanges();
      expect(within(dateError).getByText('Vul uw geboortedatum in.')).toExist();
    });
  });

  describe('Error handling for relatiestatus', () => {
    it('should show an error when relationship status is empty and touched', () => {
      spectator.blur(screen.getByLabelText('Relatiestatus'));
      spectator.detectChanges();
      expect(within(statusError).getByText('Selecteer of uw gehuwd of ongehuwd bent.')).toExist();
    });
  });
});
