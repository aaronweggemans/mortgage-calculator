import { Stap2Component } from './stap-2.component';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { createComponentFactory, Spectator } from '@ngneat/spectator/vitest';
import { HeaderComponent } from '../header/header.component';
import { FooterComponent } from '../footer/footer.component';
import { MockComponent } from 'ng-mocks';
import { screen } from '@testing-library/dom';

describe('Stap2Component', () => {
  let spectator: Spectator<Stap2Component>;

  const createComponent = createComponentFactory({
    component: Stap2Component,
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
    expect(spectator.query(HeaderComponent)?.title()).toBe('Uw inkomen');
    expect(spectator.query(HeaderComponent)?.subtitle()).toBe('Vul uw bruto jaar inkomen(s) in.');
    expect(spectator.query(HeaderComponent)?.step()).toBe(2);
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

  it('should initially not show a custom design on the has partner buttons', () => {
    expect(screen.getByRole('button', { name: 'Ja' })).not.toHaveClass('awwp-active');
    expect(screen.getByRole('button', { name: 'Nee' })).not.toHaveClass('awwp-active');
  });

  it('should be able to toggle the has partner field', () => {
    expect(screen.queryByLabelText('Bruto jaarinkomen (partner)')).not.toExist();

    spectator.click(screen.getByRole('button', { name: 'Ja' }));
    expect(screen.getByRole('button', { name: 'Ja' })).toHaveClass('awwp-active');
    expect(screen.getByLabelText('Bruto jaarinkomen (partner)')).toExist();

    spectator.click(screen.getByRole('button', { name: 'Nee' }));
    expect(screen.getByRole('button', { name: 'Nee' })).toHaveClass('awwp-active');
    expect(screen.queryByLabelText('Bruto jaarinkomen (partner)')).not.toExist();
  });

  it('should focus the partner income input field when the user presses on has a partner', () => {
    spectator.click(screen.getByRole('button', { name: 'Ja' }));
    expect(screen.getByLabelText('Bruto jaarinkomen (partner)')).toBeFocused();
  });
});
