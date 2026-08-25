import { Stap4Component } from './stap-4.component';
import { beforeEach, describe, expect, it } from 'vitest';
import { createComponentFactory, Spectator } from '@ngneat/spectator/vitest';

describe('Stap4Component', () => {
  let spectator: Spectator<Stap4Component>;

  const createComponent = createComponentFactory(Stap4Component);

  beforeEach(() => {
    spectator = createComponent();
  });

  it('should create', () => {
    expect(spectator.component).toBeTruthy();
  });
});
