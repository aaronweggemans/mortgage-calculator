import { Stap2Component } from './stap-2.component';
import { beforeEach, describe, expect, it } from 'vitest';
import { createComponentFactory, Spectator } from '@ngneat/spectator/vitest';

describe('Stap2Component', () => {
  let spectator: Spectator<Stap2Component>;

  const createComponent = createComponentFactory(Stap2Component);

  beforeEach(() => {
    spectator = createComponent();
  });

  it('should create', () => {
    expect(spectator.component).toExist();
  });
});
