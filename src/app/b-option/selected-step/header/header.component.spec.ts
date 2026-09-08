import { HeaderComponent } from './header.component';
import { beforeEach, describe, expect, it } from 'vitest';
import { createComponentFactory, Spectator } from '@ngneat/spectator/vitest';
import { screen } from '@testing-library/dom';

describe('HeaderComponent', () => {
  let spectator: Spectator<HeaderComponent>;

  const createComponent = createComponentFactory({
    component: HeaderComponent,
  });

  beforeEach(() => {
    spectator = createComponent({
      props: {
        title: 'Persoonlijke situatie',
        subtitle: 'Vul uw persoonlijke gegevens in.',
        step: 1,
      },
    });
  });

  it('should create', () => {
    expect(spectator.component).toBeTruthy();
  });

  it('should render the title', () => {
    expect(screen.getByText('1. Persoonlijke situatie')).toExist();
  });

  it('should render the subtitle', () => {
    expect(screen.getByText('Vul uw persoonlijke gegevens in.')).toExist();
  });

  it('should render the badge with the step number', () => {
    expect(screen.getByText('Stap 1 van 4')).toExist();
  });
});
