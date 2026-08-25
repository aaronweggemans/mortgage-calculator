import { beforeEach, describe, expect, it } from 'vitest';
import { createComponentFactory, Spectator } from '@ngneat/spectator/vitest';
import { Stap1Component } from './stap-1.component';

describe('Stap1Component', () => {
  let spectator: Spectator<Stap1Component>;

  const createComponent = createComponentFactory({
    component: Stap1Component,
  });

  beforeEach(() => {
    spectator = createComponent();
  });

  it('should create the app', () => {
    expect(spectator.component).toBeTruthy();
  });
});
