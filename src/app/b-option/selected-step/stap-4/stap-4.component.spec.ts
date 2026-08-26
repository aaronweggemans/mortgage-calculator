import { Stap4Component } from './stap-4.component';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { createComponentFactory, Spectator } from '@ngneat/spectator/vitest';
import { HeaderComponent } from '../header/header.component';
import { FooterComponent } from '../footer/footer.component';
import { screen } from '@testing-library/dom';
import { MockComponent } from 'ng-mocks';

describe('Stap4Component', () => {
  let spectator: Spectator<Stap4Component>;

  const createComponent = createComponentFactory({
    component: Stap4Component,
    componentImports: [
      [HeaderComponent, MockComponent(HeaderComponent)],
      [FooterComponent, MockComponent(FooterComponent)],
    ],
  });

  beforeEach(() => {
    spectator = createComponent();
  });

  it('should create', () => {
    expect(spectator.component).toBeTruthy();
  });

  it('should render a header with its corresponding information', () => {
    expect(spectator.query(HeaderComponent)).toExist();
    expect(spectator.query(HeaderComponent)?.title()).toBe('Uw maximale hypotheek');
    expect(spectator.query(HeaderComponent)?.subtitle()).toBe(
      'Op basis van de ingevulde gegevens is uw indicatie:',
    );
    expect(spectator.query(HeaderComponent)?.step()).toBe(4);
  });

  it('should only be possible to reset the flow', () => {
    const spyOnNext = vi.spyOn(spectator.component.resetFlow, 'emit');
    spectator.click(screen.getByText('Opnieuw berekening maken'));
    expect(spyOnNext).toHaveBeenCalled();
  });

  it('should navigate outside of the application when pressing on persoonlijk advies aanvragen', () => {
    vi.stubGlobal('window', { location: { hostname: 'www.jwz-fd.nl' } });
    spectator.click(screen.getByText('Persoonlijk advies aanvragen'));
    expect(window.location.href).toBe('www.jwz-fd.nl/contact');
  });
});
