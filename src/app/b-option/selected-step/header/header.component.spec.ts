import { HeaderComponent } from './header.component';
import { beforeEach, describe, expect, it } from 'vitest';
import { createComponentFactory, Spectator } from '@ngneat/spectator/vitest';

describe('HeaderComponent', () => {
  let spectator: Spectator<HeaderComponent>;

  const createComponent = createComponentFactory({
    component: HeaderComponent,
  });

  beforeEach(() => {
    spectator = createComponent();
  });

  it('should create', () => {
    expect(spectator.component).toBeTruthy();
  });
});
