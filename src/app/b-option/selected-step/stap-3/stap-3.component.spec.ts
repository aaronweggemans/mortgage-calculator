import { Stap3Component } from './stap-3.component';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { createComponentFactory, Spectator } from '@ngneat/spectator/vitest';
import { HeaderComponent } from '../header/header.component';
import { FooterComponent } from '../footer/footer.component';
import { MockComponent } from 'ng-mocks';
import { screen } from '@testing-library/dom';

describe('Stap3Component', () => {
  let spectator: Spectator<Stap3Component>;

  const createComponent = createComponentFactory({
    component: Stap3Component,
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
    expect(spectator.query(HeaderComponent)?.title()).toBe('Wonen');
    expect(spectator.query(HeaderComponent)?.subtitle()).toBe('Vul uw huidige woonsituatie in.');
    expect(spectator.query(HeaderComponent)?.step()).toBe(3);
  });

  it('should render a footer', () => {
    expect(spectator.query(FooterComponent)).toExist();
  });

  it('should emit next when the next button is clicked from the footer', () => {
    const spyOnNext = vi.spyOn(spectator.component.next, 'emit');
    spectator.query(FooterComponent)?.next.emit();
    expect(spyOnNext).toHaveBeenCalled();
  });

  it('should emit previous when the previous button is clicked from the footer', () => {
    const spyOnPrevious = vi.spyOn(spectator.component.previous, 'emit');
    spectator.query(FooterComponent)?.previous.emit();
    expect(spyOnPrevious).toHaveBeenCalled();
  });

  it('should initially not show a custom design on the has bought a house previously buttons', () => {
    expect(screen.getByRole('button', { name: 'Ja' })).not.toHaveClass('awwp-active');
    expect(screen.getByRole('button', { name: 'Nee' })).not.toHaveClass('awwp-active');
  });

  it('should be able to toggle the has bought a house previously field', () => {
    expect(screen.queryByLabelText('Bruto jaarinkomen (partner)')).not.toExist();

    spectator.click(screen.getByRole('button', { name: 'Ja' }));
    expect(screen.getByRole('button', { name: 'Ja' })).toHaveClass('awwp-active');

    spectator.click(screen.getByRole('button', { name: 'Nee' }));
    expect(screen.getByRole('button', { name: 'Nee' })).toHaveClass('awwp-active');
  });
});
