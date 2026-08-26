import { beforeEach, describe, expect, it, vi } from 'vitest';
import { createComponentFactory, Spectator } from '@ngneat/spectator/vitest';
import { Stap1Component } from './stap-1.component';
import { FooterComponent } from '../footer/footer.component';
import { MockComponent } from 'ng-mocks';
import { HeaderComponent } from '../header/header.component';

describe('Stap1Component', () => {
  let spectator: Spectator<Stap1Component>;

  const createComponent = createComponentFactory({
    component: Stap1Component,
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
    expect(spectator.query(HeaderComponent)?.title()).toBe('Persoonlijke situatie');
    expect(spectator.query(HeaderComponent)?.subtitle()).toBe('Vul uw persoonlijke gegevens in.');
    expect(spectator.query(HeaderComponent)?.step()).toBe(1);
  });

  it('should render a footer', () => {
    expect(spectator.query(FooterComponent)).toExist();
  });

  it('should emit next when the next button is clicked from the footer', () => {
    const spyOnNext = vi.spyOn(spectator.component.next, 'emit');
    spectator.query(FooterComponent)?.next.emit();
    expect(spyOnNext).toHaveBeenCalled();
  });
});
