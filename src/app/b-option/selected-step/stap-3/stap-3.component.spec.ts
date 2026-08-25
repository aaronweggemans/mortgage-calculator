import { Stap3Component } from './stap-3.component';
import { beforeEach, describe, expect, it } from 'vitest';
import { createComponentFactory, Spectator } from '@ngneat/spectator/vitest';

describe('Stap3Component', () => {
  let spectator: Spectator<Stap3Component>;

  const createComponent = createComponentFactory(Stap3Component);

  beforeEach(() => {
    spectator = createComponent();
  });

  it('should create', () => {
    expect(spectator.component).toBeTruthy();
  });
});
