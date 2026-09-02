import { Stap3Component } from './stap-3.component';
import { beforeEach, describe, expect, it } from 'vitest';
import { createComponentFactory, Spectator } from '@ngneat/spectator/vitest';
import { screen } from '@testing-library/dom';

describe('Stap3Component', () => {
  let spectator: Spectator<Stap3Component>;

  const createComponent = createComponentFactory({
    component: Stap3Component,
  });

  beforeEach(() => {
    spectator = createComponent();
  });

  it('should create', () => {
    expect(spectator.component).toBeTruthy();
  });

  it('should initially not show a custom design on the has bought a house previously buttons', () => {
    expect(screen.getByRole('button', { name: 'Ja' })).not.toHaveClass('awwp-active');
    expect(screen.getByRole('button', { name: 'Nee' })).not.toHaveClass('awwp-active');
  });

  it('should be able to toggle the has bought a house previously field', () => {
    expect(screen.queryByLabelText('Bruto jaarinkomen (partner)')).not.toExist();

    spectator.click(screen.getByRole('button', { name: 'Ja' }));
    expect(screen.getByRole('button', { name: 'Ja' })).toHaveClass('awwp-active');

    spectator.click(screen.getByRole('button', { name: 'Nee' }));
    expect(screen.getByRole('button', { name: 'Nee' })).toHaveClass('awwp-active');
  });
});
