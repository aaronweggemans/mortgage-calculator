import { Stap4Component } from './stap-4.component';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { createComponentFactory, Spectator } from '@ngneat/spectator/vitest';
import { screen } from '@testing-library/dom';

describe('Stap4Component', () => {
  let spectator: Spectator<Stap4Component>;

  const createComponent = createComponentFactory({
    component: Stap4Component,
  });

  beforeEach(() => {
    spectator = createComponent();
  });

  it('should create', () => {
    expect(spectator.component).toBeTruthy();
  });

  it('should navigate outside of the application when pressing on persoonlijk advies aanvragen', () => {
    vi.stubGlobal('window', { location: { hostname: 'www.jwz-fd.nl' } });
    spectator.click(screen.getByText('Persoonlijk advies aanvragen'));
    expect(window.location.href).toBe('www.jwz-fd.nl/contact');
  });
});
