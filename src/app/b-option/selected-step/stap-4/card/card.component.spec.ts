import { beforeEach, describe, expect, it } from 'vitest';
import { CardComponent } from './card.component';
import { createComponentFactory, Spectator } from '@ngneat/spectator/vitest';

describe('CardComponent', () => {
  let spectator: Spectator<CardComponent>;

  const createComponent = createComponentFactory({
    component: CardComponent,
  });

  beforeEach(() => {
    spectator = createComponent({
      props: { title: 'Test Title', subtitle: 'Test Description', icon: 'icon' },
    });
  });

  it('should create', () => {
    expect(spectator.component).toBeTruthy();
  });
});
