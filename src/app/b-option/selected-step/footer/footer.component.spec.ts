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
