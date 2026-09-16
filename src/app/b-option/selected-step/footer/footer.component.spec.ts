import { FooterComponent } from './footer.component';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { createComponentFactory, Spectator } from '@ngneat/spectator/vitest';
import { screen } from '@testing-library/dom';

describe('FooterComponent', () => {
  let spectator: Spectator<FooterComponent>;

  const createComponent = createComponentFactory(FooterComponent);

  beforeEach(() => {
    spectator = createComponent();
  });

  it('should create', () => {
    expect(spectator.component).toBeTruthy();
  });

  it('should initially render the buttons, separator and the disclaimer', () => {
    expect(screen.getByRole('button', { name: 'Vorige' })).toExist();
    expect(screen.getByRole('button', { name: 'Volgende' })).toExist();
    expect(screen.getByRole('separator')).toExist();
    expect(
      screen.getByText(
        'Uw gegevens worden alleen gebruikt voor deze berekening en niet opgeslagen in een database.',
      ),
    ).toExist();
  });

  it('should not show the buttons, separator and the disclaimer when those options are set to false', () => {
    spectator.setInput('showButtons', false);
    spectator.setInput('showSeparator', false);
    spectator.setInput('showDisclaimer', false);

    expect(screen.queryByRole('button', { name: 'Vorige' })).not.toExist();
    expect(screen.queryByRole('button', { name: 'Volgende' })).not.toExist();
    expect(screen.queryByRole('separator')).not.toExist();
    expect(
      screen.queryByRole(
        'Uw gegevens worden alleen gebruikt voor deze berekening en niet opgeslagen in een database.',
      ),
    ).not.toExist();
  });

  it('should emit next event when next button is clicked', () => {
    const nextSpy = vi.spyOn(spectator.component.next, 'emit');

    spectator.click(screen.getByRole('button', { name: 'Volgende' }));

    expect(nextSpy).toHaveBeenCalled();
  });

  it('should emit previous event when previous button is clicked', () => {
    const previousSpy = vi.spyOn(spectator.component.previous, 'emit');

    spectator.click(screen.getByRole('button', { name: 'Vorige' }));

    expect(previousSpy).toHaveBeenCalled();
  });
});
