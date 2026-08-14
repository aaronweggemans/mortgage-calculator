import { beforeEach, describe, expect, it } from 'vitest';
import { createComponentFactory, Spectator } from '@ngneat/spectator/vitest';
import { BOptionComponent } from './b-option.component';

describe('BOptionComponent', () => {
  let spectator: Spectator<BOptionComponent>;

  const createComponent = createComponentFactory({
    component: BOptionComponent,
  });

  beforeEach(() => {
    spectator = createComponent();
  });

  it('should create the app', () => {
    expect(spectator.component).toBeTruthy();
  });
});
