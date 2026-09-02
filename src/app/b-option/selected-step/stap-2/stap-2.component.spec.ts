import { Stap2Component } from './stap-2.component';
import { beforeEach, describe, expect, it } from 'vitest';
import { createComponentFactory, Spectator } from '@ngneat/spectator/vitest';
import { screen } from '@testing-library/dom';

describe('Stap2Component', () => {
  let spectator: Spectator<Stap2Component>;

  const createComponent = createComponentFactory({
    component: Stap2Component,
  });

  beforeEach(() => {
    spectator = createComponent();
  });

  it('should create', () => {
    expect(spectator.component).toBeTruthy();
  });

  it('should initially not show a custom design on the has partner buttons', () => {
    expect(screen.getByRole('button', { name: 'Ja' })).not.toHaveClass('awwp-active');
    expect(screen.getByRole('button', { name: 'Nee' })).not.toHaveClass('awwp-active');
  });

  it('should be able to toggle the has partner field', () => {
    expect(screen.queryByLabelText('Bruto jaarinkomen (partner)')).not.toExist();

    spectator.click(screen.getByRole('button', { name: 'Ja' }));
    expect(screen.getByRole('button', { name: 'Ja' })).toHaveClass('awwp-active');
    expect(screen.getByLabelText('Bruto jaarinkomen (partner)')).toExist();

    spectator.click(screen.getByRole('button', { name: 'Nee' }));
    expect(screen.getByRole('button', { name: 'Nee' })).toHaveClass('awwp-active');
    expect(screen.queryByLabelText('Bruto jaarinkomen (partner)')).not.toExist();
  });

  it('should focus the partner income input field when the user presses on has a partner', () => {
    spectator.click(screen.getByRole('button', { name: 'Ja' }));
    expect(screen.getByLabelText('Bruto jaarinkomen (partner)')).toBeFocused();
  });
});
