import { AppComponent } from './app.component';
import { beforeEach, describe, expect, it } from 'vitest';
import { createComponentFactory, Spectator } from '@ngneat/spectator/vitest';

describe('AppComponent', () => {
  let spectator: Spectator<AppComponent>;

  const createComponent = createComponentFactory({
    component: AppComponent,
  });

  beforeEach(() => {
    spectator = createComponent();
  });

  it('should create the app', () => {
    expect(spectator.component).toBeTruthy();
  });
});
