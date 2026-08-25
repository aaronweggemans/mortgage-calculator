import { FooterComponent } from './footer.component';
import { beforeEach, describe, expect, it } from 'vitest';
import { createComponentFactory, Spectator } from '@ngneat/spectator/vitest';

describe('FooterComponent', () => {
  let spectator: Spectator<FooterComponent>;

  const createComponent = createComponentFactory(FooterComponent);

  beforeEach(() => {
    spectator = createComponent();
  });

  it('should create', () => {
    expect(spectator.component).toBeTruthy();
  });
});
